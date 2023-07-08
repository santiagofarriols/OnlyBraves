import React, { useState, useEffect } from "react";
import Retos1 from "./Retos1";
import db from "../firebase_setup/firebase";
import Pagination from "./Pagination";
import "../Styles/RetosDisponibles.css";
import VideoPage from "./VideoPage";

function RetosDisponibles({ submitVideo }) {
  const [dares, setDares] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [daresPerPage] = useState(18);
  const [NewVideoOpen, setNewVideoOpen] = useState(false);
  const [selectedDare, setSelectedDare] = useState(null);

  const OpenNewVideo = (dare) => {
    setSelectedDare(dare);
    setNewVideoOpen(true);
  };

  const CloseNewVideo = () => {
    setNewVideoOpen(false);
  };

  const deleteDare = async (docId) => {
    await db.collection("dares").doc(docId).delete();
  };

  const addCompletedDare = async (dare) => {
    await db.collection("completedDares").add(dare);
  };

  useEffect(() => {
    const unsubscribe = db.collection("dares").onSnapshot((snapshot) => {
      const daresData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDares(daresData);
    });
    return () => unsubscribe();
  }, []);

  // Get current dares
  const indexOfLastDare = currentPage * daresPerPage;
  const indexOfFirstDare = indexOfLastDare - daresPerPage;
  const currentDares = dares.slice(indexOfFirstDare, indexOfLastDare);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-cover bg-blue bg-center h90 flex flex-col items-center justify-center">
      <VideoPage
        isOpen={NewVideoOpen}
        dare={selectedDare}
        closeModal={CloseNewVideo}
        deleteDare={deleteDare}
        addCompletedDare={addCompletedDare}
      />
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          display: "grid",
          gridTemplateColumns: " 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr ",
          gridGap: "30px",
          columnGap: "40px",
          overflowY: "scroll",
        }}
        className="mt-10 flex-grow-1 scrollable"
      >
        {currentDares.map((dare, index) => (
          <div key={index} className="grid-item">
            <Retos1
              title={dare.title}
              bgc="#FDE047"
              description={dare.description}
              price={dare.price}
              OpenNewVideo={() => OpenNewVideo(dare)}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          left: "0",
          overflowY: "scroll",
          width: "20%",
        }}
      >
        <div className="fixed bottom-0 w-full">
          <div className="flex justify-center">
            <Pagination
              daresPerPage={daresPerPage}
              totalDares={dares.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetosDisponibles;