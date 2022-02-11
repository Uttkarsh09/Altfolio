/* eslint-disable no-unused-vars */
import React, {useRef} from 'react'
import { useUserCredentials } from '../../Modules/Context/UserContext';
import { updateCoinsOwned } from '../../Modules/Firebase/UpdateDocument';
import {findCoinInfo} from "../../Modules/Utility/CoinListSearch";
import AutoComplete from '../Utilities/AutoComplete';

function AddCoinForm({onCloseHandler}) {
	const coinRef = useRef();
	const qtyRef = useRef();
	const avgRef = useRef();
	const [userCredentials, setUserCredentials] = useUserCredentials();

	const handleSubmit = (event) => {
		event.preventDefault();
		const coin = coinRef.current.value;
		const qty = parseFloat(qtyRef.current.value);
		const avgBP = parseFloat(avgRef.current.value);
		let coinExists = findCoinInfo({
				coinList: userCredentials.coinList, 
				coinID: coin,
			});
		console.log(coin, qty, avgBP);

		if(!coinExists){
			alert(`The coin with ID ${coin} does not exist`);
			return;
		}

		let coinUpdated = false;
		const coinsOwned = userCredentials.coinsOwned;
		coinsOwned.every((coinOwned, idx) => {
			if(coinOwned.id === coin){
				console.log("in it ")
				const oldQty = parseFloat(coinOwned.qty);
				const oldAvg = parseFloat(coinOwned.avgBP);
				coinOwned.avgBP = ((oldQty * oldAvg)+(qty*avgBP))/(oldQty+qty);
				coinOwned.qty += qty;
				coinUpdated = true;
				return false;
			}
			return true;
		})
		
		// This means that a new coin is entered
		if(!coinUpdated){
			// const newCoinInfo = findCoinInfo({
			// 	coinList: userCredentials.coinList, 
			// 	coinID: coin,
			// })
			coinsOwned.push({
				id: coin,
				name: coinExists.name,
				symbol: coinExists.symbol,
				qty: qty,
				avgBP: avgBP,
			})
		}

		userCredentials.coinsOwned = coinsOwned
		console.log("UPDATED COINS-OWNED")
		console.log(userCredentials);

		updateCoinsOwned({
			coinsOwned: userCredentials.coinsOwned,
			documentID: userCredentials.documentID
		})
		.then((res)=>{
			console.log("COINS-OWNED UPDATED");
			onCloseHandler();
			setUserCredentials((userCredentials)=>{
				return {...userCredentials, coinsOwned:coinsOwned}
			});	
		}).catch(err=>{
			console.log("ERROR WHILE UPDATING DOCS")
			console.log(err)
		})
	};

	return (
		<div className='add-coin-form'>
			<div className='close-form' onClick={onCloseHandler}>X</div>

			<div className="title">
				Add New Coin
			</div>

			<form onSubmit={handleSubmit}>
				<div className='user-input'>
					{/* <AutoComplete getAutoCompleteData={getAutoCompleteData} /> */}
					<div>
						<label htmlFor="coin">Coin ID</label>
						<input type="text" id="coin" ref={coinRef} />
					</div>
					<div>
						<label htmlFor="qty">Qty</label>
						<input type="number" id="qty" ref={qtyRef} />
					</div>
					<div>
						<label htmlFor="avg">Average Price</label>
						<input type="number" id="avg" ref={avgRef} />
					</div>
				</div>
				<input type="submit" className='submit' />
			</form>
		</div>
	)
}

export default AddCoinForm