// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function getFirebaseConfig(){
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_APPID,
        measurementId: process.env.MEASUREMENTID
    };
    return firebaseConfig;
}

export {getFirebaseConfig};