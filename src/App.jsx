import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Main/Home";
import UserProfile from "./Components/Profile/UserProfile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { UserContext } from "./Modules/Context/UserContext";
import "./Styles/CSS/style.css";

function App() {
	return (
		<div>
			<UserContext>
				<BrowserRouter>
					{console.log("here")}
					<Routes>
						<Route exact path="/signup" element={<Signup/>} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/profile" element={<UserProfile />} />
						<Route path="/" element={<Login />} />
					</Routes>
				</BrowserRouter>
			</UserContext>
		</div>
	);
}

export default App;
