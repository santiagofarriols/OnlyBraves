import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import '../Styles/UserProfile.css';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function UserProfile() {
  const { currentUser } = useContext(AuthContext);
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

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      <div className="profile-info">
        <h2>{currentUser.displayName}</h2>
        <p>{currentUser.email}</p>
        {isAdmin && <p>Administrador</p>}
      </div>
    </div>
  );
}

export default UserProfile;