/* eslint-disable no-unused-vars */
import React, {useRef} from 'react'
import { useUserCredentials } from '../../Modules/Context/UserContext';
import { updateCoinsOwned } from '../../Modules/Firebase/UpdateDocument';
import {findCoinInfo} from "../../Modules/Utility/CoinListSearch";
import AutoComplete from '../Utilities/AutoComplete';

function AddCoinForm({onCloseHandler}) {
	const coinRef = useRef();
	const qtyRef = useRef();
	const bpRef = useRef();
	const [userCredentials, setUserCredentials] = useUserCredentials();

	const handleSubmit = (event) => {
		event.preventDefault();
		const coin = coinRef.current.value;
		const qty = parseFloat(qtyRef.current.value);
		const buyingPrice = parseFloat(bpRef.current.value);
		console.log(coin, qty, buyingPrice);
		
		let coinExists = findCoinInfo({ coinList: userCredentials.coinList, coinID: coin });
		if(!coinExists)
		{
			alert(`The coin with ID ${coin} does not exist`);
			return;
		}

		let coinUpdated = false;
		const coinsOwned = userCredentials.coinsOwned;

		// If coinUpdated is false after this loop, means that the coin values weren't updated and a new coin was added
		coinsOwned.every((coinOwned, idx) => {
			if(coinOwned.id === coin){
				console.log("in it ")
				const oldQty = parseFloat(coinOwned.qty);
				const oldInvestedAmount = parseFloat(coinOwned.investedAmount);
				coinOwned.qty += qty;
				coinOwned.investedAmount = oldInvestedAmount + buyingPrice;
				coinUpdated = true;
				return false;
			}
			return true;
		})
		
		// This means that a new coin is entered
		if(!coinUpdated){
			coinsOwned.push({
				id: coin,
				name: coinExists.name,
				symbol: coinExists.symbol,
				qty: qty,
				investedAmount: buyingPrice,
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
						<input type="number" id="qty" ref={qtyRef} step={0.00001} min={0.00001} />
					</div>
					<div>
						<label htmlFor="bp">Buying Price</label>
						<input type="number" id="bp" ref={bpRef} step={0.00001} min={0.00001} />
					</div>
				</div>
				<input type="submit" className='submit' />
			</form>
		</div>
	)
}

export default AddCoinForm