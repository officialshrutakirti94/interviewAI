// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXfPQrxApUG-isstLRT1Zvdmg6Nfb_Hs4",
  authDomain: "test-auth-4ae52.firebaseapp.com",
  projectId: "test-auth-4ae52",
  storageBucket: "test-auth-4ae52.firebasestorage.app",
  messagingSenderId: "256941134554",
  appId: "1:256941134554:web:665cd355eed55a562d0be3",
  measurementId: "G-J9LWX7H5V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
// const analytics = getAnalytics(app);