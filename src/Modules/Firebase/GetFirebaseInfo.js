import {getFirebaseConfig} from "./fbConfig";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseApp = initializeApp(getFirebaseConfig());
const db = getFirestore();
const auth = getAuth();

export {firebaseApp, auth, db};