import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./index.scss"
import { logout} from "../utils"

export default function Navbar({
	isLoggedIn,
	setLoginFalse
}) {
	const history = useHistory()
	return (
		<div className="navbar-container">
			<div className="navbar-sub-container">
					<Link to="/" style={{textDecoration: "none"}}>
						<h1 className="navbar-logo">My<span>Job</span></h1>
					</Link>
					<div className="nav-right-link">
						{isLoggedIn && 
							(
							<Link className="nav-post-job" to="/post-new-job">
								Post a Job
							</Link>)
						}
						{isLoggedIn ? 
							<button 
								onClick={() => {
									logout()
									setLoginFalse()
									history.push("/")
								}}
								className="navbar-login-btn">
								Logout
							</button> :
							<Link to="/sign-up">
								<button className="navbar-login-btn">
									Login/Signup
								</button>
							</Link>
						}
					</div>
			</div>
			<hr />
		</div>
	)
}
