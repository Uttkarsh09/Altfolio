import { db } from "./GetFirebaseInfo";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";

async function createUserDataDocument(data){
	try{
		const collectionRef = collection(db, "user-data");
		const docRef = await addDoc(collectionRef, data);
		console.log(`New document created id ${docRef.id}`);
	} catch(e) {
		console.log("ERROR WHILE CREATING DOCUMENT: ", e);
	}
}

function updateCoinsOwned(coinsOwned, documentID){
	const docRef = doc(db, "user-data", documentID);
	return updateDoc(docRef, {
		coinsOwned: coinsOwned
	});
}

function updateRealizedGain(amount, documentID){
	const docRef = doc(db, "user-data", documentID);
	return updateDoc(docRef, {
		realizedGain: amount
	});
}

function updateTotalInvestedAmount(amount, documentID){
	const docRef = doc(db, "user-data", documentID);
	return updateDoc(docRef, {
		totalInvestedAmount: amount
	});
}

export { 
	createUserDataDocument, 
	updateCoinsOwned, 
	updateRealizedGain,
	updateTotalInvestedAmount
};