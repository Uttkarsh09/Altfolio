import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Main/Home";
import UserProfile from "./Components/Profile/UserProfile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./Styles/CSS/style.css";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Signup/>} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/home" element={<Home />} />
					<Route exact path="/profile" element={<UserProfile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
