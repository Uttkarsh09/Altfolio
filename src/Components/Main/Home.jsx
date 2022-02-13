/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import CoinList from './CoinList';
import DetailedView from './DetailedView';
import "../../Styles/CSS/home.css";
import {getCoinsInfo} from "../../Modules/Coins/CoinInfo";
import {useUserCredentials} from "../../Modules/Context/UserContext";
import AddCoinForm from './AddCoinForm';

const tempUserCredentialsStructure = {
    "coinsOwned": [],
	"coinInfo": [],
    "uid": "6wBQzAw3PtZHL6ScscPHjuDnEcv1",
	"totalMoneyInvested": 0
};

function Home() {
	const navigate = useNavigate();
    const [userCredentials, _] = useUserCredentials();
	const [isLoading, setIsLoading] = useState(false);
	const [coinInfo, setCoinInfo] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [coinToShowInDetailedView, setCoinToShowInDetailedView] = useState(false);
	const showAddNewCoinForm = () => { setShowAddForm(true); }
	const hideAddNewCoinForm = () => { setShowAddForm(false); }

	const updateCoinToShowInDetailedView = (coinID) => {
		coinInfo.every((coin, idx)=>{
			if(coin.id === coinID){
				setCoinToShowInDetailedView({...coin});
				return false;
			}
			return true;
		})
	}

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
			<CoinList 
				isLoading={isLoading} 
				coinInfo={coinInfo} 
				onAddCoinHandler={showAddNewCoinForm}
				updateCoinToShowInDetailedView={updateCoinToShowInDetailedView}
			/>
			<DetailedView coin={coinToShowInDetailedView} />
		</div>

		{
			showAddForm ? 
			<AddCoinForm 
				onCloseHandler={hideAddNewCoinForm} 
			/> : ""
		}

	</div>;
}




export default Home;
