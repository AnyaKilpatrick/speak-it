import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from './pages/SignUp';
import Profile from "./pages/Profile";

const App = () => (
 <Router>
    <div className="wrap">
      <Route exact path="/" component={Login}/>
      <Route exact path="/app/signup" component={SignUp}/>
      <Route exact path="/app/profile" component={Profile}/>
    </div>
  </Router>
)

export default App;
