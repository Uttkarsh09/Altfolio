import React, {useRef, useEffect} from 'react';
import {createUser} from "../../Modules/Firebase/Authentication";
import "../../Styles/CSS/signup.css";
import { Link } from 'react-router-dom';
import {useUserCredentials} from "../../Modules/Context/UserContext";

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();
	const [userCredentials, setUserCredentials] = useUserCredentials();

	useEffect(()=>{
		console.log("signup Rendered");
	}, [])

	const onSubmit = async (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		console.log("Creating user"); 
		const userCreated = await createUser(email, password);
		if( userCreated ){
			console.log("User creation process completed")
			setUserCredentials(userCreated);
		}
	}

	return <div className='signup-container'>
		<form onSubmit={onSubmit} className='signup-form'>
			<div className='user-input'>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" ref={usernameRef} />
			</div>
			<div className='user-input'>
				<label htmlFor="email">Email</label>
				<input type="text" id="email" ref={emailRef} />
			</div>
			<div className="user-inpu">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" ref={passwordRef} />
			</div>
			<div className='submit'>
				<input type="submit" />
				<Link to="/login">Login</Link>
			</div>
		</form>
	</div>;
}

export default Signup;
