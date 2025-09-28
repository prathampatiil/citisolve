// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_WF3DZetsB2bXAFNREPPXfohDcEKX-pA",
  authDomain: "civicappfree.firebaseapp.com",
  projectId: "civicappfree",
  storageBucket: "civicappfree.firebasestorage.app",
  messagingSenderId: "644663653676",
  appId: "1:644663653676:web:86ee0dd6b5263bdbbc2889",
  measurementId: "G-582ENPBTZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);