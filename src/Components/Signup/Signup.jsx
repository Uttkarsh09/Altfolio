/* eslint-disable no-unused-vars */
import React, {useRef, useEffect, useLayoutEffect, useState} from 'react';
import {createUser} from "../../Modules/Firebase/Authentication";
import { auth } from '../../Modules/Firebase/GetFirebaseInfo';
import "../../Styles/CSS/signup.css";
import { Link } from 'react-router-dom';
import {useUserCredentials} from "../../Modules/Context/UserContext";
import {useNavigate} from "react-router-dom";
import {getUserData} from "../../Modules/Firebase/QueryDocuments";
import {getCoinList, fetchCoin} from "../../Modules/Coins/CoinInfo";
import Loading from '../Utilities/Loading';

function compare(a, b){
	if(a.id < b.id){
		return -1;
	}
	else if(a.id > b.id){
		return 1;
	}
	return 0;
}

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();
	const [_, setUserCredentials] = useUserCredentials();
	const [isSigningIn, setIsSigningIn] = useState(false);
	const navigate = useNavigate();

	useLayoutEffect(()=>{
		document.title = "Altfolio | Signup";
	});

	const onSubmit = async (event) => {
		event.preventDefault();
		setIsSigningIn(true);
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const username = usernameRef.current.value;

		console.log("Creating user"); 
		const userCreated = await createUser(email, password, username);
		if( userCreated ){
			console.log("User creation process completed")
			const user = auth.currentUser;
			console.log(user);
			if(user){
				getUserData(user.uid)
				.then(userData=>{
					userData.coinsOwned = userData.coinsOwned.sort(compare);
					getCoinList()
					.then(coinList=>{
						// fetching USDT for USDtoINR conversion
						fetchCoin("tether").then((coinData)=>{
							coinData.json().then(coinData=>{
								console.log({...userData, coinList, USDtoINR: coinData.market_data.current_price.inr});
								setUserCredentials({...userData, coinList, USDtoINR: coinData.market_data.current_price.inr});
								setIsSigningIn(false);
								navigate("/home");
							})
						})
					})
					.catch(err=>{
						console.log("error while fetching coinList");
						console.error(err);
					})
				})
			}
			// setUserCredentials(userCreated);
			// navigate("/home");
		}
	}

	return <div className='signup-container'>
		{ isSigningIn ? <Loading type="spin" color="#000" /> : <div style={{display: "none"}}></div> }
		<img src="bitcoin-wallet.png" alt="Logo" />
		<div className='project-title'>
			ALTFOLIO		
		</div>
		<form onSubmit={onSubmit} className='signup-form'>
			<div className='user-input'>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" ref={usernameRef} required/>
			</div>
			<div className='user-input'>
				<label htmlFor="email">Email</label>
				<input type="text" id="email" ref={emailRef} required/>
			</div>
			<div className="user-input">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" ref={passwordRef} required/>
			</div>
			
			<input type="submit" className='submit' />
			<Link to="/login" className='link'>Already have an account ?</Link>
		
		</form>
	</div>;
}

export default Signup;
