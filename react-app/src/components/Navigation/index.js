import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LeftNavigation from '../LeftNavigation';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../../store/session';



function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();
	const dispatch = useDispatch();
	const dropdownRef = useRef(null);
	const history = useHistory();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		const closeDropdownOnClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) document.addEventListener('click', closeDropdownOnClickOutside);

		return () => {
			document.removeEventListener('click', closeDropdownOnClickOutside);
		};

	}, [isDropdownOpen]);

	if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404" || location.pathname === '/get-started') return null

	const toggleDropdown = () => {
		setIsDropdownOpen((prevState) => !prevState);
	};

	const handleLogout = () => {
		dispatch(logout());
		setIsDropdownOpen(false);
		history.push('/login')
	};

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
					{/* <span class="material-symbols-outlined">notifications</span> */}

					{sessionUser && (
						<>
							<div className="top-nav-hello-container">
								<p>Hi, {sessionUser.username}</p>
								<p id='nav-date'>{formatDate()}</p>

							</div>
						</>
					)}
					{/* <ProfileButton user={sessionUser} /> */}

					<div className="profile-button" onClick={toggleDropdown}>
						<span className="material-symbols-outlined nav-profile" id={isDropdownOpen ? 'dropDownOpen' : ''}>person</span>
						{isDropdownOpen && (
							<div className="profile-dropdown" ref={dropdownRef}>

								{sessionUser && (<p className='user-name'>{sessionUser.username}</p>)} {/* if logged in, show username */}


								<button onClick={handleLogout}>
									<span class="material-symbols-outlined">logout</span>
									Logout
								</button>
								{/* You can add more dropdown options here */}
							</div>
						)}
					</div>
				</div>


			</div>

			<LeftNavigation />
		</>

	)
}

export default Navigation;