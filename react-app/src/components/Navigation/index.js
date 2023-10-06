import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LeftNavigation from '../LeftNavigation';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();
	if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404") return null
	const formatDate = () => {
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		const today = new Date();
		return today.toLocaleDateString(undefined, options);
	};

	return (
		<>

			<div className="top-nav-container">

				<div className="top-nav-search-container">
					<span class="material-symbols-outlined">search</span>
					<input type="search" placeholder='Search any item here...' />
				</div>

				<div className="top-nav-right">
					<span class="material-symbols-outlined">notifications</span>

					{sessionUser && (
						<>
							<div className="top-nav-hello-container">
								<p>Hi, {sessionUser.username}</p>
								<p id='nav-date'>{formatDate()}</p>

							</div>
						</>
					)}
					<ProfileButton user={sessionUser} />
				</div>


			</div>

			<LeftNavigation />

		</>
		// <ul>
		// 	<li>
		// 		<NavLink exact to="/">Home</NavLink>
		// 	</li>
		// 	{isLoaded && (
		// 		<li>
		// 			<ProfileButton user={sessionUser} />
		// 		</li>
		// 	)}
		// </ul>

	)
}

export default Navigation;