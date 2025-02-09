import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhVcxqG8nGEFsPesXc3GCDTFFXb97BKvY",
  authDomain: "yugananthan-palani.firebaseapp.com",
  projectId: "yugananthan-palani",
  storageBucket: "yugananthan-palani.firebasestorage.app",
  messagingSenderId: "673859887292",
  appId: "1:673859887292:web:1e4709b896f6e5a7a4b0b9"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyCmwvbZJRTqhgJzwEfbkzrB_P5KW2kNAMM",
//   authDomain: "Webweave-db289.firebaseapp.com",
//   projectId: "Webweave-db289"
//   storageBucket: "Webweave-db289.firebasestorage.app",
//   messagingSenderId: "361931317573",
//   appId: "1:361931317573:web:0948b1bb9a072768675e2c",
//   measurementId: "G-10Q41MWKNT",
// };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
