/* eslint-disable no-unused-vars */
import React, {useRef, useEffect} from 'react';
import { auth } from '../../Modules/Firebase/GetFirebaseInfo';
import "../../Styles/CSS/login.css";
import Loading from '../Utilities/Loading';
import {Link, useNavigate} from "react-router-dom";
import {useUserCredentials} from "../../Modules/Context/UserContext";
import {getUserData} from "../../Modules/Firebase/QueryDocuments";
import {enableOnAuthStateChanged, loginUser} from "../../Modules/Firebase/Authentication";
import {getCoinList, fetchCoin} from "../../Modules/Coins/CoinInfo";
import { toast, getErrorMessage, resolveToast } from '../Utilities/ToastMessages';
import useUpdateTitle from "../Utilities/UpdateTitle";
import Input from "../Utilities/Input";

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
	let toastID;

	useUpdateTitle("Altfolio | Login")

	useEffect(()=>{
		const handleUserLogIn = () => {
			const user = auth.currentUser;
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
								toast.success("Logged in successfully 💯")
								navigate("/home");
							})
						})
					})
				})
				.catch(err=>{
					console.error(err.message);
				})
			}
		}
		
		const unsubscribe = enableOnAuthStateChanged(handleUserLogIn);
		return () => {
			unsubscribe()
		};
	}, [setUserCredentials, navigate]);

	const onSubmit = (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		toastID = toast.loading("Auto Logging in");
		loginUser(email, password)
		.then(()=>{
			resolveToast(toastID, "Logged in successfully 💯", "success");
		})
		.catch((err)=>{
			resolveToast(toastID, getErrorMessage(err.code), "error");
			console.log(err.message);
		})
	}

	return (
		<div className="login-container">
			{/* { isLogggingIn ? <Loading type="spin" color="#000" /> : <div style={{display: "none"}}></div> } */}
			<img src="bitcoin-wallet.png" alt="Logo" />
			<div className='project-title'>
				ALTFOLIO		
			</div>
			<form onSubmit={onSubmit} className='login-form'>
				<div className='user-input'>
					<label htmlFor="email">Email</label>
					<input type="text" id="email" ref={emailRef} />
				</div>
				<div className="user-input">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" ref={passwordRef} />
				</div>
				<input type="submit" className='submit' />
				<Link to="/signup" className='link'>Dont have an account ?</Link>
			</form>
		</div>
	)
}

export default Login;


// .then((userCredentials)=>{
// 	const user = userCredentials.user;
// 	if(user){
// 		getUserData(user.uid)
// 		.then(userData=>{
// 			userData.coinsOwned = userData.coinsOwned.sort(compare);
// 			getCoinList()
// 			.then(coinList=>{
// 				// fetching USDT for USDtoINR conversion
// 				fetchCoin("tether").then((coinData)=>{
// 					coinData.json().then(coinData=>{
// 						console.log({...userData, coinList, USDtoINR: coinData.market_data.current_price.inr});
// 						setUserCredentials({...userData, coinList, USDtoINR: coinData.market_data.current_price.inr});
// 						navigate("/home");
// 					})
// 				})
// 			})
// 			.catch(err=>{
// 				console.log("error while fetching coinList");
// 				console.error(err);
// 			})
// 		})
// 	}
// });