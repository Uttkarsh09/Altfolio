import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Main/Home";
import UserProfile from "./Components/Profile/UserProfile";
import {ToastContainer, Slide} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { UserContext } from "./Modules/Context/UserContext";
import "./Styles/CSS/style.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div>
			<UserContext>
				<BrowserRouter>
					<Routes>
						<Route exact path="/signup" element={<Signup/>} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/profile" element={<UserProfile />} />
						<Route path="/" element={<Login />} />
					</Routes>
				</BrowserRouter>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick={true}
					rtl={false}
					draggable={true}
					pauseOnHover={true}
				/>
			</UserContext>
		</div>
	);
}

export default App;
