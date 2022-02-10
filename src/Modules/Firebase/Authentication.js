import { auth } from "./GetFirebaseInfo";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { createUserDataDocument } from "./Update";
import {getUserData} from "./QueryDocuments";

async function createUser(email, password, displayName){
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredentials.user;
        const newUserData = {
            uid: user.uid,
            coinsOwned: [],
            totalMoneyInvested: 0,
        };
        // console.log(user);
        await updateUserProfile(displayName)
        await createUserDataDocument(newUserData);
        console.log("User created Completely");
        return newUserData;
    } catch (err){
        console.log(`err - ${err.code} ${err.message}`);
        return false;
    }
}

async function updateUserProfile(displayName){
    try{
        await updateProfile(auth.currentUser, {
            displayName: displayName
        })
        console.log("display name updated"); 
    } catch (err){
        console.log("ERROR WHILE UPDATING DISPLAY NAME", err);
    }
}

function enableOnAuthStateChanged(handleUserSignedIn){
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
        // console.log("subscribing to uthStateChanged");
        if(user){
            handleUserSignedIn(user);
        } else {
            console.log("user not found (onAuthStateChanged)");
        }
    })

    return unsubscribe;
}

export {createUser, updateUserProfile, enableOnAuthStateChanged};