/* eslint-disable no-unused-vars */
import React, {useEffect, useRef} from 'react'
import { useUserCredentials } from '../../Modules/Context/UserContext';
import { updateCoinsOwned, updateTotalInvestedAmount } from '../../Modules/Firebase/UpdateDocument';
import {findCoinInfo} from "../../Modules/Utility/CoinListSearch";
import AutoComplete from '../Utilities/AutoComplete';

function AddCoinForm({onCloseHandler}) {
	const coinRef = useRef();
	const qtyRef = useRef();
	const bpRef = useRef();
	const [userCredentials, setUserCredentials] = useUserCredentials();

	const handleSubmit = (event) => {
		event.preventDefault();
		const coinID = coinRef.current.value;
		const qty = parseFloat(qtyRef.current.value);
		const buyingPrice = parseFloat(bpRef.current.value);
		const totalInvestedAmount = userCredentials.totalInvestedAmount + buyingPrice;
		console.log(coinID, qty, buyingPrice);
		
		let coinExists = findCoinInfo({ coinList: userCredentials.coinList, coinID: coinID });
		if(!coinExists)
		{
			alert(`The coin with ID ${coinID} does not exist`);
			return;
		}

		let coinUpdated = false;
		const coinsOwned = userCredentials.coinsOwned;

		// If coinUpdated is false after this loop, means that the coin values weren't updated and a new coin was added
		coinsOwned.every((coinOwned, idx) => {
			if(coinOwned.id === coinID){
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
				id: coinID,
				name: coinExists.name,
				symbol: coinExists.symbol,
				qty: qty,
				investedAmount: buyingPrice,
			})
		}

		userCredentials.coinsOwned = coinsOwned

		Promise.all([
			updateCoinsOwned( userCredentials.coinsOwned, userCredentials.documentID),
			updateTotalInvestedAmount(totalInvestedAmount, userCredentials.documentID)
		])
		.then((res)=>{
			console.log("COINS-OWNED UPDATED");
			onCloseHandler();
			setUserCredentials((userCredentials)=>{
				return {
					...userCredentials, 
					coinsOwned:coinsOwned, 
					totalInvestedAmount: totalInvestedAmount
				}
			});	
		}).catch(err=>{
			console.log("ERROR WHILE UPDATING DOCS")
			console.log(err)
		})
	};

	useEffect(()=>{
		coinRef.current.focus();
	}, [])

	return (
		<div className='add-coin-form add'>
			<img 
				className='close-form' 
				src="https://img.icons8.com/ios-filled/50/000000/delete-sign--v1.png" 
				alt=""
				onClick={onCloseHandler}
			/>

			<div className="title">
				Add New Coin
			</div>

			<form onSubmit={handleSubmit}>
				<div className='user-input add'>
					{/* <AutoComplete getAutoCompleteData={getAutoCompleteData} /> */}
					<div className='block'>
						<label htmlFor="coin">Coin ID</label>
						<input type="text" id="coin" ref={coinRef} />
					</div>
					<div className='block'>
						<label htmlFor="qty">Qty</label>
						<input type="number" id="qty" ref={qtyRef} step={0.00001} min={0.00001} />
					</div>
					<div className='block'>
						<label htmlFor="bp">Buying Price</label>
						<input type="number" id="bp" ref={bpRef} step={0.00001} min={0.00001} />
					</div>
				</div>
				<input type="submit" className='submit add' />
			</form>
		</div>
	)
}

export default AddCoinForm