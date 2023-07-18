import React, { useState, useEffect } from 'react';
import '../Styles/AdminRequests.css';
import db from '../firebase_setup/firebase';

function AdminRequests() {
  const [proposedDares, setProposedDares] = useState([]);
  const [pendingDares, setPendingDares] = useState([]);

  useEffect(() => {
    const unsubscribeProposed = db.collection('proposedDares').onSnapshot((snapshot) => {
      const proposedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProposedDares(proposedData);
    });

    const unsubscribePending = db.collection('pendingDares').onSnapshot((snapshot) => {
      const pendingData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingDares(pendingData);
    });

    return () => {
      unsubscribeProposed();
      unsubscribePending();
    };
  }, []);

  const handleApprove = async (id, dare, type) => {
    console.log("Aprobando reto", id);
    const { id: _, ...dareWithoutId } = dare; // Elimina el campo id del objeto dare
    try {
      // Si es una propuesta, la movemos a pendingDares
      if (type === 'proposed') {
        await db.collection('dares').add(dareWithoutId);
      } 
      // Si es pendiente, la movemos a completedDares
      else if (type === 'pending') {
        await db.collection('completedDares').add(dareWithoutId);
      }
      // Eliminamos la dare original
      await db.collection(type + 'Dares').doc(id).delete();
    } catch (error) {
      console.error("Error al aprobar el reto: ", error);
    }
  };
  
  const handleReject = async (id, dare, type) => {
    console.log("Rechazando reto", id);
    const { id: _, ...dareWithoutId } = dare; // Elimina el campo id del objeto dare
    try {
      await db.collection('dares').add(dareWithoutId);
      await db.collection(type + 'Dares').doc(id).delete();
    } catch (error) {
      console.error("Error al rechazar el reto: ", error);
    }
  };
  
  
  const handleDelete = async (id, type) => {
    console.log("Eliminando reto", id);
    try {
      // Eliminar el reto de proposedDares/pendingDares
      await db.collection(type + 'Dares').doc(id).delete();
    } catch (error) {
      console.error("Error al eliminar el reto: ", error);
    }
  };

  
  return (
    <div className="requests-container">
      <h1>Solicitudes</h1>

      <div className="proposed-dares-card">
        <h2>Propuestas</h2>
        {proposedDares.map((dare) => (
          <div key={dare.id} className="dare-card">
            <h2>{dare.title}</h2>
            <p>{dare.description}</p>
            <p>Precio: {dare.price}</p>
            <p>ID del usuario: {dare.braveID}</p>
            <p>ID del owner: {dare.ownerID}</p>
            <a href={dare.videoUrl} target="_blank" rel="noreferrer">Ver video</a>
            <button onClick={() => handleApprove(dare.id, dare, 'proposed')}>Aprobar</button>
            <button onClick={() => handleReject(dare.id, dare, 'proposed')}>Rechazar</button>
            <button onClick={() => handleDelete(dare.id, 'proposed')}>Eliminar</button>

          </div>
        ))}
      </div>

      <div className="pending-dares-card">
        <h2>Pendientes</h2>
        {pendingDares.map((dare) => (
          <div key={dare.id} className="dare-card">
            <h2>{dare.title}</h2>
            <p>{dare.description}</p>
            <p>Precio: {dare.price}</p>
            <p>ID del usuario: {dare.braveID}</p>
            <p>ID del owner: {dare.ownerID}</p>
            <a href={dare.videoUrl} target="_blank" rel="noreferrer">Ver video</a>
            <button onClick={() => handleApprove(dare.id, dare, 'pending')}>Aprobar</button>
            <button onClick={() => handleReject(dare.id, dare, 'pending')}>Rechazar</button>
            <button onClick={() => handleDelete(dare.id, 'pending')}>Eliminar</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRequests;