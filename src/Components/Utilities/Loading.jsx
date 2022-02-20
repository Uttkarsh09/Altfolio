import React from 'react'
import ReactLoading from "react-loading";
import "../../Styles/CSS/loading.css";

function Loading({type, color}){
	return <div className='loading-container'>
		<div className='loading-indicator'>
			<ReactLoading type={type} color={color} />
		</div>
	</div>;
}

export default Loading;