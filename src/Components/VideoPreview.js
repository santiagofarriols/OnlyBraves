import React, { useState, useContext } from 'react';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import db from '../firebase_setup/firebase';
import { AuthContext } from '../Components/AuthContext';

const storage = firebase.storage().ref();

function VideoPreview({ file, dare }) {
  const [progress, setProgress] = useState(0);
  const { currentUser } = useContext(AuthContext);
  
  const moveDareToPending = async (videoUrl) => {
    try {
      const pendingDare = { ...dare, videoUrl, braveId: currentUser.uid };
      await db.collection('pendingDares').add(pendingDare);
      await db.collection('dares').doc(dare.id).delete();
    } catch (error) {
      console.error('Error al mover el reto: ', error);
    }
  };
  

  const handleUploadVideo = async () => {
    if (!currentUser) {
      alert('Inicia sesión para subir videos');
      return;
    }
    const storageRef = storage;
    const userId = currentUser.uid; 
    const videoRef = storageRef.child(`${userId}/videos/${file.name}`); 
  
    const snapshot = await videoRef.put(file);
  
    setProgress(snapshot.bytesTransferred / snapshot.totalBytes * 100);
  
    // Obtenemos la URL del video subido
    const videoUrl = await snapshot.ref.getDownloadURL();
  
    // Pasamos la URL del video a moveDareToPending
    await moveDareToPending(videoUrl);
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
