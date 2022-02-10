/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import CoinList from './CoinList';
import DetailedView from './DetailedView';
import "../../Styles/CSS/home.css";
import {getCoinsInfo} from "../../Modules/Coins/CoinInfo";
import {useUserCredentials} from "../../Modules/Context/UserContext";

const tempUserCredentialsStructure = {
    "coinsOwned": [],
	"coinInfo": [],
    "uid": "6wBQzAw3PtZHL6ScscPHjuDnEcv1",
	"totalMoneyInvested": 0
};

function Home() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [coinInfo, setCoinInfo] = useState([]);
    const [userCredentials, _] = useUserCredentials();
	
	useEffect(()=>{
        getCoinsInfo(userCredentials.coinsOwned)
		.then(detailedCoinsInfo=>{
			console.log(detailedCoinsInfo);
            setCoinInfo(()=>detailedCoinsInfo)
        })
		.catch(err=>{
			console.log("Error while getCoinsInfo");
			console.log(err);
		})
    }, [userCredentials])

	return <div className='home-container'>
		<div className='nav-bar'>
			<div className='user-profile-icon' onClick={()=>navigate("/profile")}></div>
		</div>

		<div className='info-container'>
			<CoinList isLoading={isLoading} coinInfo={coinInfo} />
			<DetailedView />
		</div>
	</div>;
}




export default Home;
