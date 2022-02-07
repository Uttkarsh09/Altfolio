import React from 'react';

function Signup() {
	
	const onSubmit = (event) => {
		event.preventDefault();
		console.log("Submitted");
	}

	return <div className='signup-container'>
		<form onSubmit={onSubmit}>

		</form>
	</div>;
}

export default Signup;
