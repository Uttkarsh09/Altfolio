import {toast} from "react-toastify";

const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const errorCodes = {
    "auth/invalid-email": "Please enter a valid email 😕",
    "auth/email-already-exists": "Email alredy exists, try logging in or enter a new one 🧐",
    "auth/invalid-display-name": "Invalid username 😕",
    "auth/wrong-password": "Wrong password 🥸",
    "auth/invalid-password": "Invalid password 🥸",
    "auth/weak-password": "Weak password - password should be at least 6 characters 💪",
    "auth/user-not-found": "User not found with the provided credentials 🤕",
    // "":"",
}

function getErrorMessage(errCode) {
    const errMessage = errorCodes[errCode];
    if(errMessage){ return errMessage; }
    else{
        return errCode
    }
};

function resolveToast(id, msg, type){
	toast.update(id, {
		render: msg, 
		type: type,
		isLoading: false,
		autoClose: 3000
	})
}

export {options, toast, getErrorMessage, resolveToast};