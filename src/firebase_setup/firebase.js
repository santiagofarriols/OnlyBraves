import firebase from 'firebase/compat/app';

import "firebase/compat/auth";
import "firebase/compat/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAcay2xn2AeeIn3pEEzLqhrkPU0squZ4oA",
  authDomain: "doyoudare-1cbc5.firebaseapp.com",
  storageBucket: 'gs://doyoudare-1cbc5.appspot.com',
  databaseURL: "https://doyoudare-1cbc5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "doyoudare-1cbc5",
  storageBucket: "doyoudare-1cbc5.appspot.com",
  messagingSenderId: "420825729065",
  appId: "1:420825729065:web:00d0a72d60d18c443bf438",
  measurementId: "G-J50KJE2NXY"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db


