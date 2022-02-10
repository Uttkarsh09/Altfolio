/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Loading from "./Loading";
import {useUserCredentials} from "../../Modules/Context/UserContext";

function CoinList({isLoading, coinInfo}){
    const [userCredentials, setUserCredentials] = useUserCredentials();

	return <div className="coin-list">
		{
			// isLoading ? <Loading /> :
			<div>
				{
                    coinInfo.map(coin => {
                        return <CoinCard coin={coin} key={coin.name} />
                    })
                }
			</div>
		}
	</div>
}

function CoinCard({coin}){
    const name = coin.name;
    const currentPrice = coin.market_data.current_price.inr;
    return <div className="coin-card">
        {name}-{currentPrice}
    </div>
}

export default CoinList;