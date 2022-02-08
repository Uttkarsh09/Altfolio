import { db } from "./GetFirebaseInfo";
import {addDoc, collection} from "firebase/firestore";


async function createUserDataDocument(data){
	try{
		const collectionRef = collection(db, "user-data")
		const docRef = await addDoc(collectionRef, data);
		console.log(`New document created id ${docRef.id}`)
	} catch(e) {
		console.log("ERROR WHILE CREATING DOCUMENT: ", e);
	}
}

export { createUserDataDocument };