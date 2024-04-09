import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2Hs90u7h3-uAhDxCmpMTQXojQIr8RGJc",
  authDomain: "fpl-stats-df203.firebaseapp.com",
  projectId: "fpl-stats-df203",
  storageBucket: "fpl-stats-df203.appspot.com",
  messagingSenderId: "1027961446527",
  appId: "1:1027961446527:web:76690a2190d3416e33df4a",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
