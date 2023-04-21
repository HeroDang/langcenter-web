import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZIFdMsjBLubZBAGPLD1x7H2g5GQILyCE",
  authDomain: "langmanager-99134.firebaseapp.com",
  projectId: "langmanager-99134",
  storageBucket: "langmanager-99134.appspot.com",
  messagingSenderId: "43277949578",
  appId: "1:43277949578:web:ce34086e2aff93ac592b73",
  measurementId: "G-VQ0KF5GWWP"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, analytics, app };
