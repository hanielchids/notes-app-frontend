import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data?.message || error.message);
    }
  };

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/notes",
        newNote,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([...notes, response.data]);
      setNewNote({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding note:", error.response?.data?.message || error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Your Notes</h1>

      <div className="note-creation">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newNote.description}
          onChange={(e) =>
            setNewNote({ ...newNote, description: e.target.value })
          }
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div className="note-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
