import React, { useState } from 'react';
import Modal from "react-modal";
import logob from "../Multimedia/LogoBlack.png";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const customStyles = {
  content: {
    width:"30vw",
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

function PopupRegister({isOpen, closeModal}) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      user.user
        .sendEmailVerification()
        .then(() => {
          setIsLoading(false);
          setError("Registro exitoso. Por favor verifica tu correo electrónico.");
          closeModal();
        })
        .catch(error => {
          setIsLoading(false);
          setError("Error al enviar correo electrónico de verificación: " + error.message);
        });
    })
    .catch(error => {
      setIsLoading(false);
      setError("Error en el registro: " + error.message);
    });
  }

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-70">

        <div className="register-container text-center  ">
        <div className="flex w-full justify-between  ">
        <div></div>
        <img className="h-20 w-20 bg-transparent border-none outline-none center"  src={logob} alt={"logo"} />
        <button className="w-6 h-6 text-gray-700 hover:text-black" onClick={closeModal}>
        ✕
          </button>
          </div>
        <h1 className="titulo">Bienvenido de nuevo </h1>
       
      <form className="w-3/4 "onSubmit={handleSubmit}>
        <div className="mb-4 w-full">
          <label className="block font-bold mb-2 text-gray-700 w-full" htmlFor="username">
            Nombre de usuario:
          </label>
          <input 
            className="border border-gray-400 p-2 w-full" 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            id="username" 
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block font-bold mb-2 text-gray-700 w-full" htmlFor="email">
            Email:
          </label>
          <input 
            className="border border-gray-400 p-2 w-full" 
            type="text" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            id="email" 
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block font-bold mb-2 text-gray-700 w-full" htmlFor="password">
            Contraseña:
          </label>
          <input 
            className="border border-gray-400 p-2 w-full" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            id="password" 
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block font-bold mb-2 text-gray-700 w-full" htmlFor="password2">
            Repite tu Contraseña:
          </label>
          <input 
            className="border border-gray-400 p-2 w-full" 
            type="password" 
            value={password2} 
            onChange={e => setPassword2(e.target.value)} 
            id="password2" 
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs italic mb-4">{error}</p>
        )}
        <button 
          className=" bg-yellow-400 hover:bg-yellow-700 text-Black font-bold py-2 px-4 rounded" 
          type="submit" 
          disabled={isLoading}
        >
          Registrarse
        </button>
      </form>
    </div>
      </Modal>
      
  );
}
export default PopupRegister;



