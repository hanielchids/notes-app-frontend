import React, { useEffect, useState } from "react";
import axios from "axios";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
