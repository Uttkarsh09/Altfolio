import {app, auth} from "./GetFirebaseInfo";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { getFirebaseConfig } from "./FirebaseConfig";


function createUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{		
        const user = userCredentials.user;
        console.log("User created ");
        console.log(user)
    })
    .catch(err=>{
        console.log(`err - ${err.code} ${err.message}`);
    })
}

export {createUser};