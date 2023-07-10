import React, { useState } from 'react';
import HomePage from './HomePage';
import DareVideo1 from './DareVideo1';

function HomeContainer({ toggleHome }) {
  const [showDareVideo, setShowDareVideo] = useState(false);

  const toggleHomeContainer = () => {
    setShowDareVideo(!showDareVideo);
  };

  return (
    <>
      {!showDareVideo && <HomePage toggleHome={toggleHomeContainer} />}
      {showDareVideo && <DareVideo1 toggleHome={toggleHomeContainer} />}
    </>
  );
}

export default HomeContainer;