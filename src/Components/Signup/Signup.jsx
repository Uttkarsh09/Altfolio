/* eslint-disable no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import {createUser} from "../../Modules/Firebase/Authentication";
import { auth } from '../../Modules/Firebase/GetFirebaseInfo';
import "../../Styles/CSS/signup.css";
import { Link } from 'react-router-dom';
import {useUserCredentials} from "../../Modules/Context/UserContext";
import {useNavigate} from "react-router-dom";
import {getUserData} from "../../Modules/Firebase/QueryDocuments";
import {getCoinList, fetchCoin} from "../../Modules/Coins/CoinInfo";
import Loading from '../Utilities/Loading';
import { toast, getErrorMessage, resolveToast } from '../Utilities/ToastMessages';
import useUpdateTitle from '../Utilities/UpdateTitle';

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
	const navigate = useNavigate();

	useUpdateTitle("Altfolio | Signup");

	const onSubmit = async (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const username = usernameRef.current.value;
		let userCreated;
		let toastID;
		
		try{
			toastID = toast.loading("Signing In...");
			userCreated = await createUser(email, password, username);
		} 
		catch (err){
			resolveToast(toastID, getErrorMessage(err.code), "error");
			console.log(err.code);
			console.log(err.message);
			return false;
		}

		if( userCreated ){
			const user = auth.currentUser;
			if( user ){
				getUserData(user.uid).then((userData)=>{
					userData.coinsOwned = userData.coinsOwned.sort(compare);
					getCoinList().then((coinList)=>{
						fetchCoin("tether").then((coinData)=>{
							coinData.json().then((coinData)=>{
								const userInfoObject = {
									...userData,
									coinList,
									USDtoINR: coinData.market_data.current_price.inr
								};
								console.log(userInfoObject);
								setUserCredentials(userInfoObject);
								resolveToast(toastID, "Account created ✅", "success");
								navigate("/home");
							})
						})
					})
					.catch(err=>{
						resolveToast(toastID, getErrorMessage(err.code), "error");
						console.log("error while fetching coinList");
						console.error(err.message);
					})
				})
			}
		}
	}

	return <div className='signup-container'>
		{/* { isSigningIn ? <Loading type="spin" color="#000" /> : <div style={{display: "none"}}></div> } */}
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
