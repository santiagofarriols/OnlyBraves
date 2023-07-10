import React, { useContext } from 'react';
import '../Styles/Estilos/Retos1.css';
import { AuthContext } from './AuthContext';

const Retos1 = (props) => {
  const { currentUser } = useContext(AuthContext);

  const handleClick = () => {
    props.OpenNewVideo();
  };

  return (
    <div className="card redondeo">
      <div className="precio">
        {props.price}€
        <div className="titulo">{props.title}</div>
        <div className="line" style={{ backgroundColor: props.bgc }}></div>
        <div className="bottom">
          <div className="descripcion">{props.description}</div>
          <div className="Realizar">
            <button
              className={`btn ${
                currentUser ? "btn-primary" : "btn-secondary cursor-not-allowed"
              }`}
              onClick={handleClick}
              type="submit"
              disabled={!currentUser}
            >
              Realizar Reto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retos1;