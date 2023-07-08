import React, { useState, useEffect } from 'react';
import '../Styles/AdminRequests.css';
import db from '../firebase_setup/firebase';

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('pendingDares').onSnapshot((snapshot) => {
      const requestData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestData);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (id, request) => {
    console.log("Aprobando reto", id);
    try {
      // Mover el reto de pendingDares a completedDares
      await db.collection('completedDares').add(request);
      await db.collection('pendingDares').doc(id).delete();
    } catch (error) {
      console.error("Error al aprobar el reto: ", error);
    }
  };

  const handleReject = async (id, request) => {
    console.log("Rechazando reto", id);
    try {
      // Mover el reto de pendingDares a dares con los campos especificados
      const { description, ownerID, price, title } = request; // Cambia ownerID a userId
      await db.collection('dares').add({ description, ownerID, price, title });
      await db.collection('pendingDares').doc(id).delete();
    } catch (error) {
      console.error("Error al rechazar el reto: ", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Eliminando reto", id);
    try {
      // Eliminar el reto de pendingDares
      await db.collection('pendingDares').doc(id).delete();
    } catch (error) {
      console.error("Error al eliminar el reto: ", error);
    }
  };

  return (
    <div className="requests-container">
      <h1>Solicitudes</h1>
      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <h2>{request.title}</h2>
          <p>{request.description}</p>
          <p>Precio: {request.price}</p>
          <p>ID del usuario: {request.braveID}</p>
          <p>ID del owner: {request.ownerID}</p>
          <a href={request.videoUrl} target="_blank" rel="noreferrer">Ver video</a>
          <button onClick={() => handleApprove(request.id, request)}>Aprobar</button>
          <button onClick={() => handleReject(request.id, request)}>Rechazar</button>
          <button onClick={() => handleDelete(request.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default AdminRequests;
