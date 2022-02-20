/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useNavigate} from "react-router-dom";
import CoinList from './CoinList';
import DetailedView from './DetailedView';
import "../../Styles/CSS/home.css";
import {getCoinsInfo} from "../../Modules/Coins/CoinInfo";
import {useUserCredentials} from "../../Modules/Context/UserContext";
import AddCoinForm from './AddCoinForm';
import SellCoinForm from './SellCoinForm';
import {logout} from "../../Modules/Firebase/Authentication";

const tempUserCredentialsStructure = {
    "coinsOwned": [],
	"coinInfo": [],
    "uid": "6wBQzAw3PtZHL6ScscPHjuDnEcv1",
	"totalMoneyInvested": 0,
	"name": "",
};

function Home() {
	const navigate = useNavigate();
    const [userCredentials, _] = useUserCredentials();
	const [isLoading, setIsLoading] = useState(true);
	const [coinInfo, setCoinInfo] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showSellForm, setShowSellForm] = useState(false);
	const [coinToShowInDetailedView, setCoinToShowInDetailedView] = useState(false);
	const showAddNewCoinForm = () => {  setShowSellForm(false); setShowAddForm(true); }
	const showSellCoinForm = (coinID) => { setShowAddForm(false); setShowSellForm(coinID); }
	const hideAddNewCoinForm = () => { setShowAddForm(false); }
	const hideSellCoinForm = () => {setShowSellForm(false)}

	useLayoutEffect(()=>{
		document.title = "Altfolio | Home";
	});

	const updateCoinToShowInDetailedView = (coinID) => {
		coinInfo.every((coin, idx)=>{
			if(coin.id === coinID){
				setCoinToShowInDetailedView({...coin});
				return false;
			}
			return true;
		})
	}

	const handleLogout = () => {
		logout().then(()=>{
			navigate("/login");
		})
	}

	useEffect(()=>{
        getCoinsInfo(userCredentials.coinsOwned)
		.then(detailedCoinsInfo=>{
			console.log(detailedCoinsInfo);
			setIsLoading(false)
            setCoinInfo(()=>detailedCoinsInfo)
        })
		.catch(err=>{
			console.log("Error while getCoinsInfo");
			console.log(err);
		})
    }, [userCredentials])

	return <div className='home-container'>
		<div className="nav-bar-container">
			<div className='nav-bar'>
				<div className='user-profile-icon' onClick={()=>navigate("/profile")}>
					<img src="profile.svg" alt="" />
				</div>
				<button className='logout' onClick={handleLogout}>Logout</button>
			</div>
		</div>
		<div className='info-container'>
			{/* ~~~~~~~~~~~~~~~~~~ COIN LIST ~~~~~~~~~~~~~~~~~~ */}
			<CoinList 
				isLoading={isLoading} 
				coinInfo={coinInfo} 
				onAddCoinHandler={showAddNewCoinForm}
				updateCoinToShowInDetailedView={updateCoinToShowInDetailedView}
			/>
			{/* ~~~~~~~~~~~~~~~~~~ DETAILED VIEW ~~~~~~~~~~~~~~~~~~ */}
			<DetailedView showSellCoinForm={showSellCoinForm} coin={coinToShowInDetailedView} />
		</div>

		{
			showAddForm ? 
			<AddCoinForm 
				onCloseHandler={hideAddNewCoinForm} 
			/> : ""
		}
		{
			showSellForm ? 
			<SellCoinForm
				onCloseHandler={hideSellCoinForm}
				coinID={showSellForm}    // Bad implementation I know, showSellForm has the coinID of the coin to sell
			/> : ""
		}

	</div>;
}




export default Home;
