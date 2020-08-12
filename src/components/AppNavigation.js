import React from 'react';
import { Link } from 'react-router-dom';
import './AppNavigation.css';
import logo from '../img/logo_pre.png';

import { useSelector } from 'react-redux';

function AppNavigation() {
	const isLogin = useSelector((state) => state.login.isLogin, []);
	const login = isLogin ? <Link to="/Login">MyPage</Link> : <Link to="/Login">Login</Link>;
	// console.log(isLogin);
	return (
		<div className="topBar">
			<Link id="mainLink" to="/">
				<img className="centerImg" src={logo} alt="학원고" title="학원고" />
			</Link>
			{login}
			<Link to="/about">About</Link>
			<Link to="/request">Request</Link>
			<Link to="/search">Search</Link>
			<Link to="/">Home</Link>
		</div>
	);
}

export default AppNavigation;
