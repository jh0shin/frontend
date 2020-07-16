import React from 'react';
import { Route, HashRouter, BrowserRouter } from 'react-router-dom';
import { positions, Provider } from 'react-alert';
import ScrollToTop from './components/ScrollToTop';
import AlertTemplate from 'react-alert-template-basic';
import './App.css';
import AppNavigation from './components/AppNavigation';
import AppBottom from './components/AppBottom';
import Home from './routes/Home';
import Search from './routes/Search';
import Request from './routes/Request';
import About from './routes/About';
import Login from './routes/Login';
import Company from './routes/Company';
import Reportsurvey from './routes/Reportsurvey';
import ContactList from './components/ContactList';
import HakwonPage from './components/hakwonPage';
// import Robots from './routes/Robots'

function AppShow() {
	return (
		<div>
			<HashRouter>
				<ScrollToTop>
					<AppNavigation />
					<Route path="/" exact={true} component={Home} />
					<Route path="/search" component={Search} />
					<Route path="/request" component={Request} />
					<Route path="/about" component={About} />
					<Route path="/login" component={Login} />
					<Route path="/company" component={Company} />
					<Route path="/Reportsurvey" component={Reportsurvey} />
					<Route path="/contactList" component={ContactList} />
					<Route path="/hakwonPage" component={HakwonPage} />
				</ScrollToTop>
				{/* <Route path="/robots.txt" component={Robots}/> */}
			</HashRouter>
			<AppBottom />
		</div>
	);
}

const options = {
	timeout: 3000,
	position: positions.BOTTOM_CENTER
};

const AlertFuction = () => (
	<Provider template={AlertTemplate} {...options}>
		<AppShow />
	</Provider>
);

function App() {
	return <AlertFuction />;
}

export default App;
