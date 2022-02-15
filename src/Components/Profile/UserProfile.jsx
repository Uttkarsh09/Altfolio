import React from 'react';
import "../../Styles/CSS/userProfile.css";
import {useNavigate} from "react-router-dom";
import { logout } from '../../Modules/Firebase/Authentication';
import {auth} from "../../Modules/Firebase/GetFirebaseInfo";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {useUserCredentials} from "../../Modules/Context/UserContext";
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


function UserProfile() {
	const navigate = useNavigate();
	const [userCredentials, setUserCredentials] = useUserCredentials();
	let values = [];
	let labels = [];
	let data = {};

	if(userCredentials.coinsOwned.length !== 0){
		userCredentials.coinsOwned.forEach(coinOwned=>{
			values.push(coinOwned.investedAmount);
			labels.push(coinOwned.name)
		})
		
		data = {
			labels: labels,
			datasets: [
				{
				label: 'Investements',
				data: values,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				  ],
				  borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				  ],
				borderWidth: 1,
				},
			],
		};
	}

	return( 
		<div className='user-profile-container'>
			<div className='nav-bar'>
				<img 
					src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-left-arrow-kmg-design-glyph-kmg-design-1.png" 
					alt="" 
					className='back-arrow'
					onClick={()=>{navigate("/home")}}
				/>
				<div style={{display: "flex"}}>
					<div className='user-profile-icon' onClick={()=>navigate("/profile")}>
						<img src="profile.svg" alt="" />
					</div>
					<button className='logout' onClick={()=>{logout()}}>Logout</button>
				</div>
			</div>

			<div className="user-area">
				<div className='username'>
					<div className='text'>
						Uttkarsh
					</div>
				</div>

				<div className="stats">
					<div className='pie-chart'>
						<Pie data={data} />
					</div>
					<div className="text-stats">
						<div className='heading'>Statistics</div>
						<div className='stats-box'>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile;
