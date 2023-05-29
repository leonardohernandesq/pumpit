import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAQIQjVSWb-pjlGOJriu_VrFrgQoMjIMok",
    authDomain: "pumpit-26d0c.firebaseapp.com",
    projectId: "pumpit-26d0c",
    storageBucket: "pumpit-26d0c.appspot.com",
    messagingSenderId: "1042469485098",
    appId: "1:1042469485098:web:38a57f8df3556bc58e2153"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage }
