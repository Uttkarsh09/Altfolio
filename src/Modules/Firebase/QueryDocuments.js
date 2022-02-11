import { db } from "./GetFirebaseInfo";
import {collection, getDocs, query, where} from "firebase/firestore";

async function getUserData(userId){
	const collectionRef = collection(db, "user-data");
	const q = query(collectionRef, where("uid", "==", userId));
	const querySnapshot =  await getDocs(q);

	if(!querySnapshot.empty){
		const snapshot = querySnapshot.docs[0];
		const documentID = snapshot.id;
		const data = snapshot.data();
		return {...data, documentID};
	} else {
		return false;
	}
}

export {getUserData};