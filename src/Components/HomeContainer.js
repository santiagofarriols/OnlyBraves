import React, { useState } from 'react';
import HomePage from './HomePage';
import DareVideo from './DareVideo';

function HomeContainer({ toggleHome }) {
  const [showDareVideo, setShowDareVideo] = useState(false);

  const toggleHomeContainer = () => {
    setShowDareVideo(!showDareVideo);
  };

  return (
    <>
      {!showDareVideo && <HomePage toggleHome={toggleHomeContainer} />}
      {showDareVideo && <DareVideo toggleHome={toggleHomeContainer} />}
    </>
  );
}

export default HomeContainer;