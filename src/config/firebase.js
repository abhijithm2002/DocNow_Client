// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPMKRKsf5ezy77fRpOUrPbuFv2lWaz4WQ",
  authDomain: "doctor-appoitment-login1.firebaseapp.com",
  projectId: "doctor-appoitment-login1",
  storageBucket: "doctor-appoitment-login1.appspot.com",
  messagingSenderId: "155697453308",
  appId: "1:155697453308:web:69c493484a6f9347dddf79",
  measurementId: "G-7XRH8DFPW5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the app instance to getAuth
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, analytics };