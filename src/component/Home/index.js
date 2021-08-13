import React from 'react'
import { Link } from 'react-router-dom'
import { isLogin } from '../utils'
import "./index.scss"
export default function index() {
	return (
		<div className="home-container">
			<div className="home-container-1">
				<h1 className="home-container-1-heading">Welcome to <span>My<span>Jobs</span></span></h1>
				<Link to={isLogin() ? "/posted-job" : "/sign-up"} className="home-container-1-btn">Get Started</Link>
			</div>
			<img src="/images/Home-Header.jpeg" className="home-header" alt="My Job" />
			<div className="home-container-2">
				<h2>Why us</h2>
				<div className="home-container-2-feature">
					<div>
						<h2>Get more visibility</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
					</div>
					<div>
						<h2>Organize your candidates</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<div>
						<h2>Verify their abilities</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
