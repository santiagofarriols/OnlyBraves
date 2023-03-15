import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAzM0XZ9v6RdFIJm5TbbMlO6-eH1misws8",
  authDomain: "onlybraves-33e80.firebaseapp.com",
  databaseURL: "https://onlybraves-33e80-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "onlybraves-33e80",
  storageBucket: "onlybraves-33e80.appspot.com",
  messagingSenderId: "255767200671",
  appId: "1:255767200671:web:29cf62492a5a24268bb3aa"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const db = firebase.firestore();

export default db


