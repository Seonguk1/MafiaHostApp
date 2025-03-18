import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZmBcp5W0uD_X4C1aEhRhZ_K8-9nWF1cQ",
  authDomain: "mafiahostapp.firebaseapp.com",
  databaseURL: "https://mafiahostapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mafiahostapp",
  storageBucket: "mafiahostapp.firebasestorage.app",
  messagingSenderId: "569459099442",
  appId: "1:569459099442:web:fda007d0493baf200c792b",
  measurementId: "G-0HT88E29Y7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const db = getFirestore(app);

export { database };
