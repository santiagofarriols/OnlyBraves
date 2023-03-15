import React, { useState } from 'react';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import db from '../firebase_setup/firebase';

const storage = firebase.storage().ref();

function VideoPreview({ file, dare }) {
  const [progress, setProgress] = useState(0);

  const moveDareToCompleted = async () => {
    try {
      await db.collection('completedDares').add(dare);
      await db.collection('dares2').doc(dare.id).delete();
    } catch (error) {
      console.error('Error al mover el reto: ', error);
    }
  };

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

    await moveDareToCompleted();
  };

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