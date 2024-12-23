import React, { useState } from "react";
import { ReactMic } from "react-mic";

const AudioRecorder = ({ noteId }) => {
  const [recording, setRecording] = useState(false);

  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);

  const onStop = async (recordedBlob) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("audio", recordedBlob.blob);
    await axios.post(`/api/notes/${noteId}/audio`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div>
      <ReactMic
        record={recording}
        onStop={onStop}
        mimeType="audio/wav"
      />
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default AudioRecorder;
