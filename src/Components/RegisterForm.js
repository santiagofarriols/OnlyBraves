import React, { useState } from 'react';
import BackgroundImage from '../Multimedia/background1.png';
import YourImage from '../Multimedia/registerimage.png';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function RegisterForm() {
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
};

  return (
    <div style={{
      display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      height: '100vh'
    }}>
    <div className="bg-white max-w-sm mx-8 h-3/6 rounded shadow-lg p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700" htmlFor="username">
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
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700" htmlFor="email">
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
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700" htmlFor="password">
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
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700" htmlFor="password2">
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
          className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" 
          type="submit" 
          disabled={isLoading}
        >
          Registrarse
        </button>
      </form>
    </div>
    <div style={{ width: '50%' }}>
    <img src={YourImage} alt="Your Image" />
  </div>
    </div>
    
  );  
}

export default RegisterForm;