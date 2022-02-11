/* eslint-disable no-unused-vars */
import React, {useRef, useEffect} from 'react';
import { auth } from '../../Modules/Firebase/GetFirebaseInfo';
import "../../Styles/CSS/login.css";
import {Link, useNavigate} from "react-router-dom";
import {useUserCredentials} from "../../Modules/Context/UserContext";
import {getUserData} from "../../Modules/Firebase/QueryDocuments";
import {enableOnAuthStateChanged} from "../../Modules/Firebase/Authentication";
import {getCoinList} from "../../Modules/Coins/CoinInfo";

function compare(a, b){
	if(a.id < b.id){
		return -1;
	}
	else if(a.id > b.id){
		return 1;
	}
	return 0;
}

function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [_, setUserCredentials] = useUserCredentials();
	const navigate = useNavigate();

	useEffect(()=>{
		console.log("loginRendered");
		const handleUserSignedIn = () => {
			const user = auth.currentUser;
			if(user){
				getUserData(user.uid)
				.then(userData=>{
					// console.log(userData);
					userData.coinsOwned = userData.coinsOwned.sort(compare);
					getCoinList()
					.then(coinList=>{
						console.log({...userData, coinList});
						setUserCredentials({...userData, coinList});
						navigate("/home");
					})
					.catch(err=>{
						console.log("error while fetching coinList");
						console.error(err);
					})
				})
			}
		}
		
		const unsubscribe = enableOnAuthStateChanged(handleUserSignedIn);
		return () => {
			// console.log("Unsubscribing");
			unsubscribe()
		};

	}, [setUserCredentials, navigate]);

	const onSubmit = (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);
		console.log("logging  user"); 
	}

	return <div className="login-container">
		<form onSubmit={onSubmit} className='login-form'>
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
				<Link to="/signup">Dont have an account?</Link>
			</div>
		</form>
		
	</div>;
}

export default Login;
