import { auth } from "./GetFirebaseInfo";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { createUserDataDocument } from "./UpdateDocument";

async function createUser(email, password, displayName){
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredentials.user;
        const newUserData = {
            uid: user.uid,
            coinsOwned: [],
            totalInvestedAmount: 0,
            realizedGain: 0,
        };
        
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

function loginUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .catch((err)=>{
        console.log("There was an error while logging in ");
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
    })
}

function logout(){
    const auth = getAuth();
    return signOut(auth)
}

export {createUser, updateUserProfile, enableOnAuthStateChanged, logout, loginUser};