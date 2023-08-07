import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaSbE6AfoNjvxv53kQeHz04PlHxUfcMJA",
  authDomain: "new-student-swimming.firebaseapp.com",
  projectId: "new-student-swimming",
  storageBucket: "new-student-swimming.appspot.com",
  messagingSenderId: "361583464921",
  appId: "1:361583464921:web:a3f0878a81ab89a6f909c8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default firebaseConfig;
