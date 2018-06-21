import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";


const App = () => (
 <Router>
    <div className="wrap">
      <Route exact path="/" component={Home}/>
    </div>
  </Router>
)

export default App;
