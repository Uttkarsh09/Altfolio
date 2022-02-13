/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Loading from "./Loading";
import {useUserCredentials} from "../../Modules/Context/UserContext";

function CoinList({isLoading, coinInfo, onAddCoinHandler, updateCoinToShowInDetailedView}){
    const [userCredentials, setUserCredentials] = useUserCredentials();

	return <div className="coin-list-container">
		{
			// isLoading ? <Loading /> :
			<div className="coin-list">
				{
                    coinInfo.map(coin => {
                        return (
                            <CoinCard 
                                coin={coin} 
                                key={coin.name} 
                                updateCoinToShowInDetailedView={updateCoinToShowInDetailedView}
                            />
                        )
                    })
                }
			</div>
		}
        <div className="add-coin-btn" onClick={onAddCoinHandler}>
            +
        </div>
	</div>
}

function CoinCard({coin, updateCoinToShowInDetailedView}){
    const name = coin.name;
    const currentPrice = coin.market_data.current_price.inr;
    const image = coin.image;

    return <div className="coin-card" onClick={()=>updateCoinToShowInDetailedView(coin.id)}>
        <div className="title">
            <img src={image.small} alt={`${name} logo`} className="icon" />
            <span className="name">{name}</span>
            <span className="currency">/INR</span>
        </div>
        <span className="price">₹ {currentPrice}</span>
    </div>
}

export default CoinList;