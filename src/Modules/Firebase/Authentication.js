import { auth } from "./GetFirebaseInfo";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { createUserDataDocument } from "./UpdateDocument";

async function createUser(email, password, displayName){
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
    return newUserData;
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
        if(user){
            handleUserSignedIn(user);
        } else {
            // console.log("user not found (onAuthStateChanged)");
        }
    })
    return unsubscribe;
}

function loginUser(email, password){
    return signInWithEmailAndPassword(auth, email, password)
}

function logout(){
    const auth = getAuth();
    return signOut(auth)
}

export {createUser, updateUserProfile, enableOnAuthStateChanged, logout, loginUser};