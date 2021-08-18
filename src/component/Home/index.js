import React from 'react'
import { Link } from 'react-router-dom'
import { isLogin } from '../utils'
import "./index.scss"
export default function index() {
	const trustedCompanies = [
		{
			name: "Goldcar",
			src: "/Goldcar.svg",
		},
		{
			name: "Gocanvas",
			src: "/Gocanvas.svg",
		},
		{
			name: "Netflix",
			src: "/Netflix.png",
		},
		{
			name: "Tokopedia",
			src: "/Tokopedia.png",
		},
		{
			name: "Zoom",
			src: "/Zoom.png",
		},
	]
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
				<div className="trusted-companies">
					<h2>Companies Who Trust Us</h2>
					<div className="trusted-companies-grid">
						{trustedCompanies.map((item) => 
							<img className="trusted-companies-img" src={`images/Trusted-Companies${item.src}`} alt={item.name} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
