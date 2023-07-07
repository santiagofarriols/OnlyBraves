import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import '../Styles/UserProfile.css';

function UserProfile() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      <div className="profile-info">
        <h2>{currentUser.displayName}</h2>
        <p>{currentUser.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
