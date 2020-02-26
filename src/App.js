import React from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import './App.css';
import App_Navigation from './components/App_Navigation'
import App_Bottom from './components/App_Bottom';
import Home from './routes/Home';
import Search from './routes/Search';
import Request from './routes/Request';
import About from './routes/About';
import ContactList from './components/ContactList';

function AppShow() {
  return (
    <div>
      <BrowserRouter>
        <App_Navigation/>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/request" component={Request}/>
        <Route path="/about" component={About}/>
        <Route path="/contactList" component={ContactList}/>
      </BrowserRouter>
      <App_Bottom/>
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

function App(){
  return(
    <AlertFuction/>
  );
}

export default App;