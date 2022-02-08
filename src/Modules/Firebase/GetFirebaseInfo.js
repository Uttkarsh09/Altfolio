import firebaseConfig from "./fbConfig";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// function getFirebaseConfig(){
//     const firebaseConfig = {
//         apiKey: process.env.APIKEY,
//         authDomain: process.env.AUTHDOMAIN,
//         projectId: process.env.PROJECTID,
//         storageBucket: process.env.STORAGEBUCKET,
//         messagingSenderId: process.env.MESSAGINGSENDERID,
//         appId: process.env.APPID,
//         measurementId: process.env.MEASUREMENTID
//     };
//     console.log("THIS IS THE FIREBASE CONFIG");
//     console.log(firebaseConfig);
//     return firebaseConfig;
// }

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export {firebaseApp, auth, db};