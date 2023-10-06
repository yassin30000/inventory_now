import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import loginLogoBlack from '../../images/inventory_now_logo_black.png'
import loginLogoWhite from '../../images/inventory_now_logo_white.png'
import greenWhite from '../../images/i-n-green-white.png'
import whitePurple from '../../images/i-n-white-purple.png'
import { NavLink } from "react-router-dom";


function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data)
			}
		} else {
			setErrors(['Confirm Password field must be the same as the Password field']);
		}
	};

	return (
		<>

			<div className="login-page-container">

				<div className="login-white-container">

					<div className="login-left-container">

						<div className="login-left-div">

							<div className="login-form-heading-container">
								<div className="login-form-heading">welcome.</div>
								<div className="login-form-subheading">it's kinda weird you don't have an account</div>
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
										<span class="material-symbols-outlined">mail</span>
										<input
											type="text"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											placeholder="Email"
										/>
									</div>

									<div class="input-container">
										<span class="material-symbols-outlined">account_circle</span>

										<input
											type="text"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											required
											placeholder="Username"
										/>
									</div>

									<div className="input-container">
										<span class="material-symbols-outlined">lock_open</span>

										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											placeholder="Password"
										/>
									</div>
									<div className="input-container">

										<span class="material-symbols-outlined">lock</span>

										<input
											type="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
											placeholder="Confirm Password"
										/>
									</div>
								</div>
								<div className="login-buttons-container">

									<button className="log-in-btn" type="submit">Sign Up</button>
								</div>
							</form>
							<div className="create-account-link-container">
								<span>wait do i know you? Lmao. </span>
								<NavLink to='/login'>Log In</NavLink>
							</div>
						</div>
					</div>

					<div className="login-right-container">

						<img src={loginLogoWhite} alt="" />
					</div>
				</div>
			</div>
		</>
	);
}

export default SignupFormPage;
