import React, { useState } from "react";
import axios from "axios";

const NoteForm = ({ fetchNotes }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/api/notes", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
