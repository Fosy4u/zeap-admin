import { initializeApp } from "firebase/app";


const env = process.env.ENV || "dev";
const bucket =
  env === "dev"
    ? process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEV
    : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PROD;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: "your databaseURL here",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: bucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
