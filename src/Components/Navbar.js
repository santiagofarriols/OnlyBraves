import { useRef, useState, useEffect } from 'react';
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          // Confirmar si el usuario es un administrador.
          if (!!idTokenResult.claims.admin) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  const OpenLogin = () => {
    setLoginOpen(true);
  };

  const CloseLogin = () => {
    setLoginOpen(false);
  };
  const OpenRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const CloseRegister = () => {
    setRegisterOpen(false);
  };
  const OpenDesafia = () => {
    setDesafiaOpen(!DesafiaOpen);
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

        {isAdmin && <Link to="/solicitudes">
          Solicitudes
        </Link>}

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
            <div>
              <a href="/#" onClick={handleLogout}>
                Desconectarse
              </a>
              <Link to="/perfil">
                Perfil
              </Link>
            </div>
          ) : (
            <div>
              <a href="/#" onClick={OpenLogin}>
                Iniciar Sesión
              </a>
              <a href="/#" className="red-box" onClick={OpenRegister}>
                Registrarse
              </a>
            </div>
          )
        }
        <Popuplogin toggleRegister={OpenRegister} isOpen={LoginOpen} closeModal={CloseLogin} />
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