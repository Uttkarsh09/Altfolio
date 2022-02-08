import React, {useRef} from 'react';
import {createUser} from "../../Modules/Firebase/Authentication";
import "../../Styles/CSS/signup.css";

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();

	const onSubmit = (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		console.log("Creating user"); 
		createUser(email, password)
	}

	return <div className='signup-container'>
		<form onSubmit={onSubmit} className='signup-form'>
			<label htmlFor="email">Email</label>
			<input type="text" id="email" ref={emailRef} />
			<br />
			<label htmlFor="password">Password</label>
			<input type="password" id="password" ref={passwordRef} />
			<input type="submit" />
		</form>
	</div>;
}

export default Signup;
