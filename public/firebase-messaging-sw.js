/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js',
);

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
  apiKey: 'AIzaSyB040yGEcwK4e8YDwsJSlm_DtMO0wd2xLI',
  authDomain: 'zeap-7de3d.firebaseapp.com',
  projectId: 'zeap-7de3d',
  storageBucket: 'zeap-7de3d.appspot.com',
  messagingSenderId: '241723989064',
  appId: '1:241723989064:web:96e8f0a4599343aac50c7d',
  measurementId: 'G-V9G6DS0BS0',
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
    image: payload.notification.image,
  };

  this.registration.showNotification(notificationTitle, notificationOptions);
});
