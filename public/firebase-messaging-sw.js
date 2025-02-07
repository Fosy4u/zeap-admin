/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');
importScripts('swEnv.js'); // Added

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   // databaseURL: "your databaseURL here",
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
// access env variables in service worker
const firebaseConfig = {
  apiKey: swEnv.REACT_APP_FIREBASE_API_KEY, // Changed... repeat for other variables
  authDomain: swEnv.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: swEnv.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: swEnv.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: swEnv.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: swEnv.REACT_APP_FIREBASE_APP_ID,
  measurementId: swEnv.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  this.registration.showNotification(notificationTitle, notificationOptions);
});
