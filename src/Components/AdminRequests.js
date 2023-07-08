import React, { useState, useEffect } from 'react';
import '../Styles/AdminRequests.css';

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  // Simulamos la obtención de las solicitudes desde Firebase
  useEffect(() => {
    // Aquí deberías obtener las solicitudes desde Firebase
    // Por ahora, solo usaremos datos de prueba
    const mockRequests = [
      { id: 1, user: 'Usuario 1', challenge: 'Reto 1', status: 'Pendiente' },
      { id: 2, user: 'Usuario 2', challenge: 'Reto 2', status: 'Pendiente' },
      // Agrega más solicitudes de prueba aquí
    ];

    setRequests(mockRequests);
  }, []);

  const handleApprove = (id) => {
    // Aquí deberías actualizar el estado de la solicitud en Firebase
    console.log(`Aprobada la solicitud ${id}`);
  };

  const handleReject = (id) => {
    // Aquí deberías actualizar el estado de la solicitud en Firebase
    console.log(`Rechazada la solicitud ${id}`);
  };

  return (
    <div className="requests-container">
      <h1>Solicitudes</h1>
      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <h2>{request.user}</h2>
          <p>{request.challenge}</p>
          <p>{request.status}</p>
          <button onClick={() => handleApprove(request.id)}>Aprobar</button>
          <button onClick={() => handleReject(request.id)}>Rechazar</button>
        </div>
      ))}
    </div>
  );
}

export default AdminRequests;
