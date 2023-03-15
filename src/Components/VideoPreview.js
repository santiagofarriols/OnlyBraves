import React, { useState } from 'react';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';

const storage = firebase.storage().ref();

function VideoPreview({ file}) {
  const [progress, setProgress] = useState(0); 
  


  const handleUploadVideo = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      alert('Inicia sesión para subir videos');
      return;
    }
    const storageRef = storage;
    const videoRef = storageRef.child(`videos/${file.name}`);
   
    const snapshot = await videoRef.put(file);

    setProgress(snapshot.bytesTransferred / snapshot.totalBytes * 100);
  }
  return (
    <div>
      <video src={URL.createObjectURL(file)} controls />
      <br />
      <progress value={progress} max="100" />   
      <br />
      <button onClick={handleUploadVideo}>Subir video</button>
    </div>
  );
}

export default VideoPreview;