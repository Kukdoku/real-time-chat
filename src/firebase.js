import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCw_qWi1vjAKasmmh1ef3tQsB7LsjmQ8Kg",
  authDomain: "new-messanger-clone.firebaseapp.com",
  projectId: "new-messanger-clone",
  storageBucket: "new-messanger-clone.appspot.com",
  messagingSenderId: "343243782028",
  appId: "1:343243782028:web:adc4b1500825a2ac6048a9",
  measurementId: "G-NTY3RDSK75",
});

const db = firebaseApp.firestore();
const storage = firebase.storage();

export { db, storage };
