import React, { useState } from "react";
import Modal from "react-modal";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "../Styles/login-form.css";
import LoginImage from "../Multimedia/Loginimage4.png";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function Popuplogin({ toggleRegister, isOpen, closeModal}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setError("");
        closeModal();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("El id o la contraseña no son correctos");
      });
  };

  return (
    
      
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="register-container">
          <h1 className="titulo">Bienvenido de nuevo </h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              Contraseña:
              <input
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
    
  }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit" disabled={isLoading}>
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



