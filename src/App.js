import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import RegisterForm from './Components/RegisterForm';
import DareVideo from './Components/DareVideo';
import Desafia from './Components/Desafia';
import RetosDisponibles from './Components/RetosDisponibles';
import VideoPage from './Components/VideoPage';
import HomePage from './Components/HomePage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/reto" element={<DareVideo />} />
            <Route path="/desafia" element={<Desafia />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/atrevete" element={<RetosDisponibles />} />
          </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;