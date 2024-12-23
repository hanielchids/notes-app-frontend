import { ReactMic } from 'react-mic';
import { useState } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/api/' });

const AudioRecorder = () => {
  const [record, setRecord] = useState(false);
  const [noteId, setNoteId] = useState('');

  const handleStop = async (recordedBlob) => {
    const formData = new FormData();
    formData.append('audio', recordedBlob.blob, 'audio.wav');
    formData.append('title', `Audio Note - ${new Date().toLocaleString()}`);
    formData.append('description', 'Recorded via AudioRecorder');

    try {
      await API.post('notes/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Audio uploaded successfully');
    } catch (err) {
      alert('Failed to upload audio');
    }
  };

  return (
    <div>
      <h2>Record Audio</h2>
      <ReactMic
        record={record}
        onStop={handleStop}
        mimeType="audio/wav"
      />
      <button onClick={() => setRecord(true)}>Start Recording</button>
      <button onClick={() => setRecord(false)}>Stop Recording</button>
    </div>
  );
};

export default AudioRecorder;
