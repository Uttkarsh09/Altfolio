import React, {useRef} from 'react';

function SellCoinForm({onCloseHandler, coinID}) {
	const qtyRef = useRef();
	const avgSP = useRef();

	const handleSubmit = (even) => {

	}

	return (
		<div className='add-coin-form'>
			<div className='close-form' onClick={onCloseHandler}>X</div>

			<div className="title">
				Sell Coin
			</div>

			<form onSubmit={handleSubmit}>
				<div className='user-input'>
				<div>
						<label htmlFor="coin">Coin ID</label>
						{coinID}
					</div>
					<div>
						<label htmlFor="qty">Qty</label>
						<input type="number" id="qty" ref={qtyRef} step={0.00001} min={1} />
					</div>
					<div>
						<label htmlFor="avg">Average Price</label>
						<input type="number" id="avg" ref={avgSP} step={0.00001} min={0.00001} />
					</div>
				</div>
				<input type="submit" className='submit' />
			</form>
		</div>
  	)
}

export default SellCoinForm