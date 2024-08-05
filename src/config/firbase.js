// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7ZPT4E4U6Ie19GTSBAqaYSXSuJUxUub0",
  authDomain: "fortunetalk-node.firebaseapp.com",
  databaseURL: "https://fortunetalk-node-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fortunetalk-node",
  storageBucket: "fortunetalk-node.appspot.com",
  messagingSenderId: "410336005427",
  appId: "1:410336005427:web:d68a62840090bbefbc8246"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const firestore = getFirestore(app)
const analytics = getAnalytics(app);
