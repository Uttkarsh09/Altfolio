import React, { useEffect, useState, useMemo } from 'react';
import "../../Styles/CSS/userProfile.css";
import useUpdateTitle from "../Utilities/UpdateTitle";
import {useNavigate} from "react-router-dom";
import { getCoinsInfo } from '../../Modules/Coins/CoinInfo';
import { logout } from '../../Modules/Firebase/Authentication';
import { auth } from '../../Modules/Firebase/GetFirebaseInfo';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale,	BarElement,	Title } from 'chart.js';
import {useUserCredentials} from "../../Modules/Context/UserContext";
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
	ArcElement, 
	Tooltip, 
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title
);

function UserProfile() {
	const navigate = useNavigate();
	const [userCredentials, setUserCredentials] = useUserCredentials();
	const [coinsInfo, setCoinInfo] = useState(false);
	const username = auth.currentUser.displayName;
	let values = [];
	let pieChartlabels = [];
	let pieChartData = {};
	let barGraphData = {};
	let totalInvestedAmount = 0;
	let totalCurrentInvestedValue = 0;
	const barGraphOptions = {
		responsive: true,
		plugins: {
		  legend: {
			position: 'bottom',
		  },
		  title: {
			display: true,
			text: 'Invested vs Gain',
		  },
		},
	  };
	let barGraphlabels = ["Invested", "Current Value"];

	const handleLogout = () => {
		logout().then(()=>{
			navigate("/login");
		})
	}

	useUpdateTitle("Altfolio | User Profile");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const coinsOwnedMemo = useMemo(()=> userCredentials.coinsOwned, []);
	useEffect(()=>{
		if(userCredentials.coinsOwned.length !== 0){
			getCoinsInfo(coinsOwnedMemo).then((coinInfo)=>{
				console.log("Setting coin info")
				setCoinInfo(coinInfo);
			});
		}
	}, [coinsOwnedMemo, userCredentials.coinsOwned.length])

	if(userCredentials.coinsOwned.length !== 0){
		userCredentials.coinsOwned.forEach(coinOwned=>{
			values.push(coinOwned.investedAmount);
			pieChartlabels.push(coinOwned.name)

			console.log(coinsInfo)
			if(coinsInfo){
				totalInvestedAmount += coinOwned.investedAmount;
				for(let i=0;i<coinsInfo.length;i++){
					if(coinsInfo[i].id === coinOwned.id){
						totalCurrentInvestedValue += (coinOwned.qty * coinsInfo[i].market_data.current_price.inr);
						break;
					}
				}
				console.log(totalCurrentInvestedValue);
				console.log(totalInvestedAmount);
			}
			barGraphData = {
				barGraphlabels,
				datasets: [
					{
						label: 'Invested Amount',
						data: [totalInvestedAmount],
						backgroundColor: 'rgba(76, 255, 96, 0.7)',
					},
					{
						label: 'Current Value',
						data: [totalCurrentInvestedValue],
						backgroundColor: 'rgba(255, 76, 76, 0.7)',
					},
				],
			};
		})
		
		pieChartData = {
			labels: pieChartlabels,
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
					'rgba(132, 213, 147, 0.8)',
					'rgba(218, 177, 147, 0.8)',
					'rgba(128, 207, 113, 0.8)'
				  ],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(50, 183, 74, 0.8)',
					'rgba(215, 115, 41, 0.8)',
					'rgba(63, 208, 36, 0.8)'
				  ],
				borderWidth: 1,
				},
			],
		};
	}

	return( 
		<div className='user-profile-container'>
			<div className="nav-bar-container">
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
						<button className='logout' onClick={handleLogout}>Logout</button>
					</div>
				</div>
			</div>
			
			<div className="user-area">
				<div className='username'>
					<div className='text'>
						{username}
					</div>
				</div>

				<div className="stats">
					{
						userCredentials.coinsOwned.length === 0 ? 
						<NoCoinsToShow /> :
						<>
							<div className='pie-chart'>
								<Pie data={pieChartData} />
							</div>
							{/* <div className='bar-graph'>
								<Bar options={barGraphOptions} data={barGraphData} />	
							</div> */}
							<div className="text-stats">
								<div className='heading'>Statistics</div>
								<div className='stats-box'>
									<div className="stat">
										<span className='property-name'>Total Invested Amount: </span>
										<span className='value'>{Math.round(totalInvestedAmount, 4)}</span>
									</div>
									<div className="stat">
										<span className='property-name'>Current Invested Value: </span>
										<span className='value'>{Math.round(totalCurrentInvestedValue, 4)}</span>
									</div>
									<div className="stat">
										<span className='property-name'>Net Gain: </span>
										<span className='value'>
											{Math.round(totalCurrentInvestedValue - totalInvestedAmount, 4)}
										</span>
									</div>
									<div className="stat">
										<span className='property-name'>Net Gain(%): </span>
										<span className='value'>
											{
												Math.round(((totalCurrentInvestedValue - totalInvestedAmount)/totalInvestedAmount*100), 4)
											}%
										</span>
									</div>
								</div>
							</div>
						</>
					}
				</div>
			</div> 
		</div>
	)
}

function NoCoinsToShow(){
	return <div className='no-coins-to-show'>
		<img src="exclamation-circle.svg" alt='No Coins Added'/>
		<div className='no-coins-text'>No coins added</div>
	</div>
}

export default UserProfile;

{/* <img src="https://img.icons8.com/external-filled-agus-raharjo/64/000000/external-exclamation-mark-justice-filled-agus-raharjo.png"/> */}