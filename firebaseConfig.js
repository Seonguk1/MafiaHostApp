import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZmBcp5W0uD_X4C1aEhRhZ_K8-9nWF1cQ",
  authDomain: "mafiahostapp.firebaseapp.com",
  projectId: "mafiahostapp",
  storageBucket: "mafiahostapp.appspot.com",
  messagingSenderId: "569459099442",
  appId: "1:569459099442:web:fda007d0493baf200c792b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
