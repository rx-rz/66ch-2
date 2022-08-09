import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, writeBatch} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBHP1_eZR9k8H21CzgMSzLpkIGBdVKajls",
  authDomain: "thekawaiiblog-68df1.firebaseapp.com",
  projectId: "thekawaiiblog-68df1",
  storageBucket: "thekawaiiblog-68df1.appspot.com",
  messagingSenderId: "717443254099",
  appId: "1:717443254099:web:1437cd9c72a978ee2703a6",
  measurementId: "G-BQ1L9X1CC3"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)
export const storage = getStorage(app);
export const batch = writeBatch(database)