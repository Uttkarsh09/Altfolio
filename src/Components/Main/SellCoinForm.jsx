/* eslint-disable no-unused-vars */
import React, {useRef, useEffect} from 'react';
import { useUserCredentials } from '../../Modules/Context/UserContext';
import { updateCoinsOwned, updateRealizedGain, updateTotalInvestedAmount } from '../../Modules/Firebase/UpdateDocument';
import { findCoinInfo } from '../../Modules/Utility/CoinListSearch';

function SellCoinForm({onCloseHandler, coinID}) {
	const sellQtyRef = useRef();
	const SPRef = useRef();
	const [userCredentials, setUserCredentials] = useUserCredentials();

	const handleSubmit = (event) => {
		let coinsOwned = userCredentials.coinsOwned;
		const documentID = userCredentials.documentID;
		let coin;
		
		for(let i=0;i<coinsOwned.length;i++){
			const coinOwned = coinsOwned[i]
			if(coinOwned.id === coinID){
				coin = coinOwned;
				if(coinOwned.qty < parseFloat(sellQtyRef.current.value)){
					alert("You cannot sell more than what you have");
					return;
				}
			}
		}
		
		event.preventDefault();
		let totalQty = coin.qty;
		let investedAmount = coin.investedAmount;
		let totalInvestedAmount = 0;
		const avgBP = investedAmount / totalQty;
		const qtyToSell = parseFloat(sellQtyRef.current.value);
		const sellingPrice = parseFloat(SPRef.current.value);
		let realizedGain = userCredentials.realizedGain;
		
		console.log("1", (investedAmount-(qtyToSell*avgBP)));
		console.log("2", (sellingPrice))
		realizedGain+=(sellingPrice - qtyToSell*avgBP);
		investedAmount -= (qtyToSell*avgBP);
		totalQty -= qtyToSell;

		coinsOwned.forEach(coinOwned=>{
			if(coinOwned.id === coinID){
				coinOwned.investedAmount = investedAmount;
				coinOwned.qty = totalQty;
			}
			totalInvestedAmount += coinOwned.investedAmount;
		})

		const newUserCredentials = {
			...userCredentials,
			coinsOwned: coinsOwned,
			realizedGain: realizedGain,
			totalInvestedAmount: totalInvestedAmount
		}
		console.log(newUserCredentials);

		Promise.all([
			updateCoinsOwned(coinsOwned, documentID),
			updateRealizedGain(realizedGain, documentID),
			updateTotalInvestedAmount(totalInvestedAmount, documentID)
		]).then((resArr)=>{
			console.log("all values updated");
			console.log(resArr);
			onCloseHandler();
			setUserCredentials(newUserCredentials);
		})
	}

	useEffect(()=>{
		sellQtyRef.current.focus();
	}, [])

	return (
		<div className='add-coin-form sell'>
			<img 
				className='close-form' 
				onClick={onCloseHandler} 
				src="https://img.icons8.com/ios-filled/50/000000/delete-sign--v1.png" 
				alt=""
			/>

			<div className="title">
				Sell Coin
			</div>

			<form onSubmit={handleSubmit}>
				<div className='user-input sell'>
					<div className='block'>
						<label htmlFor="coin">Coin ID</label>
						{coinID}
					</div>
					<div className='block'>
						<label htmlFor="qty">Qty</label>
						<input type="number" id="qty" ref={sellQtyRef} step={0.00001} min={1} />
					</div>
					<div className='block'>
						<label htmlFor="avg">Selling Price</label>
						<input type="number" id="avg" ref={SPRef} step={0.00001} min={0.00001} />
					</div>
				</div>
				<input type="submit" className='submit sell' />
			</form>
		</div>
  	)
}

export default SellCoinForm