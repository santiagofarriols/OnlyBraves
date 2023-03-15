import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../Styles/main.css';
import logo from '../Multimedia/logo.png';
import Popuplogin from './Popuplogin';
import PopupRegister from './PopupRegister';
import PopupDesafia from './PopupDesafia';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function Navbar({ toggleHome, toggleDare }) {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const { currentUser } = useContext(AuthContext);
  const [LoginOpen, setLoginOpen] = useState(false);
  const [RegisterOpen, setRegisterOpen] = useState(false);
  const [DesafiaOpen, setDesafiaOpen] = useState(false);

  const OpenLogin = () => {
    setLoginOpen(true);
  };

  const CloseLogin = () => {
    setLoginOpen(false);
  };
  const OpenRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
    console.log(RegisterOpen);
  };

  const CloseRegister = () => {
    setRegisterOpen(false);
  };
  const OpenDesafia = () => {
    setDesafiaOpen(!DesafiaOpen);
    console.log(DesafiaOpen);
  };

  const CloseDesafia = () => {
    setDesafiaOpen(false);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <header>
      <nav ref={navRef}>
        <Link to="/atrevete" onClick={toggleDare}>
          Atrévete
        </Link>

        <a href="/#" onClick={OpenDesafia} className="red-text">
          Desafía
        </a>
        <PopupDesafia isOpen={DesafiaOpen} closeModal={CloseDesafia} />
      </nav>
      <nav ref={navRef}>
        <Link to="/" onClick={toggleHome}>
          <img className="h-20 w-20 bg-transparent border-none outline-none" src={logo} alt={'logo'} />
        </Link>
      </nav>
      <nav ref={navRef}>
      {
        currentUser ? (
            <a href="/#" onClick={handleLogout}>
              Desconectarse
            </a>
          ) : (
            <a href="/#" onClick={OpenLogin}>
              Iniciar Sesión
            </a>
          )
        }
        <Popuplogin toggleRegister={OpenRegister} isOpen={LoginOpen} closeModal={CloseLogin} />
        <a href="/#" className="red-box" onClick={OpenRegister}>
          Registrarse
        </a>
        <PopupRegister isOpen={RegisterOpen} closeModal={CloseRegister} />
      </nav>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes />
      </button>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;