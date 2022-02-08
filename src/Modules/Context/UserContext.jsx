import React, {createContext, useContext, useState} from 'react';

const userContext = createContext();

function UserContext(props) {
    const [userCredentials, setUserCredentials] = useState({user: null});
    
    return <userContext.Provider value={[userCredentials, setUserCredentials]}>
        {props.children}
    </userContext.Provider>;
}

function useUserCredentials(){
    const context = useContext(userContext);
    if(context === undefined){
        throw new Error("useCount must be used within <UseContext> </UseContext>")
    }
    return context;
}

export {UserContext, useUserCredentials};