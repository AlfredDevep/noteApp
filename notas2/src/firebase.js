// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiFFwcitwKgKR_HX14BzMmf7t5znSijC4",
  authDomain: "notas2-a0164.firebaseapp.com",
  projectId: "notas2-a0164",
  storageBucket: "notas2-a0164.appspot.com",
  messagingSenderId: "671082363013",
  appId: "1:671082363013:web:7826674d61921983b411ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default app;
export { ref, push, serverTimestamp };