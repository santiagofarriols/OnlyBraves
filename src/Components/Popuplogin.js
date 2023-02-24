import React, { useState } from "react";
import Modal from "react-modal";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "../Styles/login-form.css";
import logob from "../Multimedia/LogoBlack.png";   

Modal.setAppElement('#root');

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

function Popuplogin({ toggleRegister, isOpen, closeModal}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    setIsLoading(true);
    setIsLoading(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setError("");
        closeModal();
      })
      .catch((error) => {
        setError("El id o la contraseña no son correctos");
      });
  };

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-70">

        <div className="register-container text-center ">
        <div className="flex w-full justify-between ">
        <div></div>
        <img className="h-20 w-20 bg-transparent border-none outline-none center"  src={logob} alt={"logo"} />
        <button className="w-6 h-6 text-gray-700 hover:text-black" onClick={closeModal}>
        ✕
          </button>
          </div>
        <h1 className="titulo">Bienvenido de nuevo </h1>
          
        
          
          <form onSubmit={handleSubmit} >
            <label className="block text-gray-700 font-bold mb-2 w-full" htmlFor="email">
              Email:
              <input
               className="w-full border border-gray-400 p-2 mb-4"
               placeholder="Titulo del reto" 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label className="block text-gray-700 font-bold mb-2 w-full"  htmlFor="password">
              Contraseña:
              <input
               className="w-full border border-gray-400 p-2 mb-4"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
        {error && <p>{error}</p>}
        <button onClick={() => {
    if (error) {
      return;
    }
    handleSubmit();
    
  }} className=" bg-yellow-400 hover:bg-yellow-700 text-Black font-bold py-2 px-4 rounded" type="submit" disabled={isLoading}>
          Iniciar sesión
        </button>
      </form>
      <div className="texto">
      <p className="p12">Si aún no tienes cuenta, regístrate <button className="link-button" onClick={toggleRegister}>aquí</button> </p>
      </div>
      </div>
      </Modal>

  );
}
export default Popuplogin;



