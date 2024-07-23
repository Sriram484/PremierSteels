
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCA2Iggnd1SrFsS1pA6BZu40LX5lGCPkNk",
  authDomain: "premiersteels484.firebaseapp.com",
  projectId: "premiersteels484",
  storageBucket: "premiersteels484.appspot.com",
  messagingSenderId: "644245790836",
  appId: "1:644245790836:web:011e73a9f95249751df121"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

const db= getFirestore(app);




export {db}