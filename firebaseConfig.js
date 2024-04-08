import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApy9fjPn9LgkwZv4u8BwNjAbzHTMfwVCA",
  authDomain: "info-6132-cd0a0.firebaseapp.com",
  databaseURL: "https://info-6132-cd0a0-default-rtdb.firebaseio.com",
  projectId: "info-6132-cd0a0",
  storageBucket: "info-6132-cd0a0.appspot.com",
  messagingSenderId: "413273905202",
  appId: "1:413273905202:web:c01fef2ec425b65656442b",
  measurementId: "G-605JGVWH0G"
};

const firebaseApp = () => initializeApp(firebaseConfig);

if (getApps().length < 1) {
  firebaseApp();
}

const db = getFirestore(firebaseApp());

export { db };

export default firebaseConfig;

