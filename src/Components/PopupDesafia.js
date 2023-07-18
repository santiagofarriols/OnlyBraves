import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from "../firebase_setup/firebase";
import Modal from "react-modal";
import logob from "../Multimedia/LogoBlack.png";
import { AuthContext } from '../Components/AuthContext';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: "30vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
};

function PopupDesafia({ isOpen, closeModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setNumber] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser || {};

  const addDare = async (dare) => {
    try {
      await db.collection('dares').add(dare);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uid) {
      const dare = {
        title,
        description,
        price,
        ownerID: uid,
      };
      await addDare(dare);
    } else {
      console.log("No user is currently signed in.");
    }

    resetInputs();
    closeModal();
  };

  const resetInputs = () => {
    setTitle("");
    setDescription("");
    setNumber("");
  }

  useEffect(() => {
    const unsubscribe = db.collection('dares').onSnapshot(snapshot => {
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isOpen) resetInputs();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-70"
    >
      <div className="register-container text-center ">
        <div className="flex w-full justify-between">
          <div></div>
          <img className="h-20 w-20 bg-transparent border-none outline-none center" src={logob} alt={"logo"} />
          <button className="w-6 h-6 text-gray-700 hover:text-black" onClick={closeModal}>
            ✕
          </button>
        </div>
        <h1 className="titulo">Nuevo reto</h1>
        <form className="form-group " onSubmit={handleSubmit}>
          <input
            maxLength={30}
            className="form-input mt-2 rounded-lg bg-white focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 block w-full appearance-none p-2 mb-4"
            type="text"
            placeholder="Titulo del reto"
            value={title}
            onFocus={(e) => e.target.classList.add("border-yellow-400")}
            onBlur={(e) => e.target.classList.remove("border-yellow-400")}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            maxLength={170}
            className="form-input mt-2 rounded-lg bg-white focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 block w-full appearance-none p-2 mb-4"
            type="text"
            placeholder="Descripción del reto "
            value={description}
            onFocus={(e) => e.target.classList.add("border-yellow-400")}
            onBlur={(e) => e.target.classList.remove("border-yellow-400")}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            maxLength={4}
            className="form-input mt-2 rounded-lg bg-white focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 block w-full appearance-none p-2 mb-4"
            type="price"
            placeholder="Precio"
            value={price}
            onFocus={(e) => e.target.classList.add("border-yellow-400")}
            onBlur={(e) => e.target.classList.remove("border-yellow-400")}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button
            className={`mt-4 font-medium py-2 px-4 rounded-full ${
              currentUser ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-gray-500 text-white cursor-not-allowed"
            }`}
            type="submit"
            disabled={!currentUser}
          >
            Agregar
          </button>
        </form>
      </div>
    </Modal>
    );
  }
  
  export default PopupDesafia;