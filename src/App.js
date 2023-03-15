import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import DareVideo from './Components/DareVideo';
import RetosDisponibles from './Components/RetosDisponibles';
import VideoPage from './Components/VideoPage';
import HomeContainer from './Components/HomeContainer';
import Navbar from './Components/Navbar';

function App() {
  return (
    <React.Fragment>
      <Router>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/reto" element={<DareVideo />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/atrevete" element={<RetosDisponibles />} />
          </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;