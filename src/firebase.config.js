import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyD7FGQ4r6s4UH9PrY2ozAp7Q8pCQITODgU",
  authDomain: "hulumfurniturept.firebaseapp.com",
  projectId: "hulumfurniturept",
  storageBucket: "hulumfurniturept.appspot.com",
  messagingSenderId: "699653264069",
  appId: "1:699653264069:web:5d65b893d1d5a2b07456ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
