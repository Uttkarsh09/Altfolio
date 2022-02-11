/* eslint-disable no-unused-vars */
import React, {useRef} from 'react'
import { useUserCredentials } from '../../Modules/Context/UserContext';
import AutoComplete from '../Utilities/AutoComplete';

function AddCoinForm({onCloseHandler}) {
	const coinRef = useRef();
	const qtyRef = useRef();
	const avgRef = useRef();
	const [userCredentials, _] = useUserCredentials();
	const getAutoCompleteData = (data) => {

	};

	const handleSubmit = (event) => {
		event.preventDefault();
		
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