import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DareVideo1 from './Components/DareVideo1';
import RetosDisponibles from './Components/RetosDisponibles';
import VideoPage from './Components/VideoPage';
import Navbar from './Components/Navbar';
import UserProfile from './Components/UserProfile';
import AdminRequests from './Components/AdminRequests';

const stripePromise = loadStripe("pk_test_51NaLLaH9iSNqlm1MVTrLoH3zxsbmvKLfI5Ue7F1JXAoc0hs073UxnZSyocn2yvW4ovlOkypM8teyLnxdjYW4lNxx00KYrWxTQZ");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <React.Fragment>
        <Router>
          <main>
            <Navbar />
            <Routes>
              <Route path="/" element={<DareVideo1 />} />
              <Route path="/reto" element={<DareVideo1 />} />
              <Route path="/video" element={<VideoPage />} />
              <Route path="/atrevete" element={<RetosDisponibles />} />
              <Route path="/perfil" element={<UserProfile />} />
              <Route path="/solicitudes" element={<AdminRequests />} />
            </Routes>
          </main>
        </Router>
      </React.Fragment>
    </Elements>
  );
}

export default App;
