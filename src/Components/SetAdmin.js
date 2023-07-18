const admin = require('firebase-admin');

var serviceAccount = require('../firebase_setup/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function setAdmin(email) {
  admin.auth().getUserByEmail(email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      console.log('Usuario establecido como administrador exitosamente');
    })
    .catch(error => {
      console.log('Error al establecer el usuario como administrador:', error);
    });
}

// Reemplaza 'user@example.com' con el correo electrónico del usuario que quieres establecer como administrador
setAdmin('facultadfing@gmail.com');