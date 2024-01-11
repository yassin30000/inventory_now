import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import loginLogoGreen from '../../images/i-n-logo-green.png'
import loginLogoBlack from '../../images/inventory_now_logo_black.png'
import loginLogoPurple from '../../images/i-n-logo-purple.png'
import backgroundImg from '../../images/neon background.png'
import whitePurple from '../../images/i-n-white-purple.png'
import loginLogoWhite from '../../images/inventory_now_logo_white.png'
import curveLogo from '../../images/actual_curve.png'


import { NavLink } from "react-router-dom";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index of the currently displayed image
	const imageUrls = [loginLogoGreen, loginLogoBlack, loginLogoPurple]; // Array of image URLs
	const imageTransitionInterval = 5000;

	const demoUserLogin = (e) => {
		setEmail('demo@aa.io')
		setPassword('password')
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	useEffect(() => {
		// Change the image index at regular intervals
		const intervalId = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				(prevIndex + 1) % imageUrls.length
			);
		}, imageTransitionInterval);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	if (sessionUser) return <Redirect to="/dashboard" />;


	return (
		<>
			<div className="login-page-container">

				<div className="login-white-container">


					<div className="login-left-container">

						<div className="login-left-div">



							<div className="login-form-heading-container">
								<div className="login-form-heading">welcome.</div>
								<div className="login-form-subheading">we're so delighted for your return</div>
							</div>

							<form onSubmit={handleSubmit}>

								<div className="login-errors">
									<ul>
										{errors.map((error, idx) => (
											<li key={idx}>{error}</li>
										))}
									</ul>

								</div>

								<div className="inputs-container">


									<div class="input-container">

										<span class="material-symbols-outlined">
											mail
										</span>
										<input
											type="text"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											placeholder="Email"
										/>
									</div>



									<div className="input-container">
										{/* <span class="material-symbols-outlined">
											lock
										</span> */}

										<span class="material-symbols-outlined">
											key
										</span>
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											placeholder="Password"
										/>
									</div>
								</div>
								<div className="login-buttons-container">

									<button className="log-in-btn" type="submit">Log in</button>
									<button className="demo-login-btn" onClick={demoUserLogin}>Log in as demo user</button>
								</div>
							</form>

							<div className="create-account-link-container">
								<span>are you new here? Lmao. </span>
								<NavLink to='/signup'>Create an Account</NavLink>
							</div>

							<div className="footer-container">
									<div className="footer-heading">Meet the developer!</div>
								<div className="footer-content">
									<span>
										<a href='https://github.com/yassin30000' target="_blank" className="footer-git">Github</a>
									</span>
									<span>
										<a href='https://yassin30000.github.io/portfolio/' target="_blank" className="footer-portfolio">Portfolio</a>
									</span>
									<span>
										<a href='https://www.linkedin.com/in/yassin-tantawy-2bb807189/' target="_blank" className="footer-linkedIn">LinkedIn</a>
									</span>
								</div>
							</div>

						</div>
					</div>
					<div className="login-right-container">

						<img src={curveLogo} alt="" className="rotating-logo" />
					</div>

				</div>
			</div>

		</>
	);
}

export default LoginFormPage;
