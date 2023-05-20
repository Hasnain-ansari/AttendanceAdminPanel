import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';

import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBgeP0coJmWqwxA9VuPwONyOYxOPHHUrII",
  authDomain: "attainpoc.firebaseapp.com",
  databaseURL: "https://attainpoc-default-rtdb.firebaseio.com",
  projectId: "attainpoc",
  storageBucket: "attainpoc.appspot.com",
  messagingSenderId: "1091559628845",
  appId: "1:1091559628845:web:b753c36ecaccd7557218a4"
};


firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);

export {
  db,
  auth,
  storage,
}


