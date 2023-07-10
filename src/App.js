import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DareVideo1 from './Components/DareVideo1';
import RetosDisponibles from './Components/RetosDisponibles';
import VideoPage from './Components/VideoPage';
import HomeContainer from './Components/HomeContainer';
import Navbar from './Components/Navbar';
import UserProfile from './Components/UserProfile';
import AdminRequests from './Components/AdminRequests'; // Importa el componente AdminRequests

function App() {
  return (
    <React.Fragment>
      <Router>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/reto" element={<DareVideo1 />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/atrevete" element={<RetosDisponibles />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/solicitudes" element={<AdminRequests />} /> {/* Agrega una ruta para las solicitudes de administrador */}
          </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
