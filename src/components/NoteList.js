import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/api/' });

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    API.get('notes/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    }).then((response) => setNotes(response.data));
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          {note.audio && (
            <audio controls>
              <source src={`http://127.0.0.1:5000${note.audio}`} type="audio/wav" />
            </audio>
          )}
        </div>
      ))}
      <Link to="/audio">Record Audio</Link>
    </div>
  );
};

export default NoteList;
