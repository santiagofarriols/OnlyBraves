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
    // Aquí deberías actualizar el estado de la solicitud en Firebase
    console.log(`Aprobada la solicitud ${id}`);
    // Mover el reto de pendingDares a completedDares
    await db.collection('completedDares').add(request);
    await db.collection('pendingDares').doc(id).delete();
  };

  const handleReject = async (id) => {
    // Aquí deberías actualizar el estado de la solicitud en Firebase
    console.log(`Rechazada la solicitud ${id}`);
    // Eliminar el reto de pendingDares
    await db.collection('pendingDares').doc(id).delete();
  };

  return (
    <div className="requests-container">
      <h1>Solicitudes</h1>
      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <h2>{request.title}</h2>
          <p>{request.description}</p>
          <p>Precio: {request.price}</p>
          <p>ID del usuario: {request.userId}</p>
          <p>ID del reto: {request.braveId}</p>
          <a href={request.videoUrl} target="_blank" rel="noreferrer">Ver video</a>
          <button onClick={() => handleApprove(request.id, request)}>Aprobar</button>
          <button onClick={() => handleReject(request.id)}>Rechazar</button>
        </div>
      ))}
    </div>
  );
}

export default AdminRequests;
