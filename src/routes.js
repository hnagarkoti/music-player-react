import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import RegisterPage from './containers/RegisterPage';
import App from './App'

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const isLoggedIn = () => {
  var token;
  if(window.localStorage.getItem('token') || window.sessionStorage.getItem('token')){
    token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
    try {
      var obj = parseJwt(token)
      if(obj.userId){  }
    } catch(err){
      browserHistory.push('/login');
    }
  }
  if(!token){
    browserHistory.push('/login');
  }
}

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="/" component={HomePage} onEnter={isLoggedIn} >
      <IndexRoute component={HomePage}/>
      <Route path="home" component={HomePage}/>
    </Route>

  </Route>
);
