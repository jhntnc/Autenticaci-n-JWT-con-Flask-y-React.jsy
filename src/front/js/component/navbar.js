import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
    let token = localStorage.getItem("jwt-token")

	function logout() {
		localStorage.clear()
		navigate("/login")
		return console.log("No user logged")
	}

	function login() {
		navigate("/login")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{token?<Link to="/home">
					<button className="btn btn-primary text-white navbar-brand mb-0 h1">User: {localStorage.getItem("email")}</button>
				</Link>:<></>}
				<div className="ml-auto">
					{token?<button className="btn btn-primary" onClick={() => logout()}>Logout</button>:<button className="btn btn-primary"onClick={() => login()}>Login</button>}
				</div>
			</div>
		</nav>
	);
};
