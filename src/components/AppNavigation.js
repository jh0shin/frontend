import React from 'react';
import { Link } from 'react-router-dom'
import './AppNavigation.css';
import logo from '../img/logo_pre.png'

function AppNavigation() {
  return (
    <div className="topBar">
		  <a id="mainLink" href="hakwongo.com"><img className="centerImg" src={logo} alt="학원고" title="학원고"/></a>
      <Link to="/about">About</Link>
      <Link to="/request">Request</Link>
      <Link to="/search">Search</Link>
      <Link to="/">Home</Link>
	  </div>
  );
}

export default AppNavigation;