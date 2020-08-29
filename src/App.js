import React from 'react';
import { Route, HashRouter /*BrowserRouter*/ } from 'react-router-dom';
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

import { connect } from 'react-redux';
import { changeState, changeId, changeData } from './store/modules/login';

function AppShow() {
	return (
		<div>
			<HashRouter>
				<ScrollToTop>
					<AppNavigation />
					{/* <Route path="/" exact={true} component={Home} />
					<Route path="/search" component={Search} /> */}

					<Route path="/" exact={true} component={Search} />
					<Route path="/search" component={Home} />

					<Route path="/request" component={Request} />
					<Route path="/about" component={About} />
					<Route path="/login" component={Login} />
					<Route path="/company" component={Company} />
					<Route path="/Reportsurvey" component={Reportsurvey} />
					<Route path="/contactList" component={ContactList} />
					<Route path="/hakwonPage/:id" component={HakwonPage} />
					<AppBottom />
				</ScrollToTop>
				{/* <Route path="/robots.txt" component={Robots}/> */}
			</HashRouter>
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

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// loading: true
		};
	}

	componentDidMount = () => {
		this.checkLogged();
	};

	checkLogged = () => {
		const { changeState, changeId, changeData } = this.props;
		changeId(localStorage.getItem('userId'));
		changeData(JSON.parse(localStorage.getItem('userData')));
		changeState(Boolean(localStorage.getItem('isLogin') === 'true'));
		this.setState({ loading: false });
	};

	render() {
		return <AlertFuction />;
	}
}

const mapStateToProps = (state) => ({
	isLogin: state.login.isLogin,
	userId: state.login.userId,
	userData: state.login.userData
});

const mapDispatchToProps = (dispatch) => ({
	changeState: (isLogin) => dispatch(changeState(isLogin)),
	changeId: (userId) => dispatch(changeId(userId)),
	changeData: (userData) => dispatch(changeData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
