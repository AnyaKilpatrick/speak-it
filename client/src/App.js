import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from './pages/SignUp';
import Profile from "./pages/Profile";
import { getUser } from './utils/Auth';
import HomeNavbar from './components/HomeNavbar';

class App extends React.Component {
  state = {
    loggedIn: false,
    user: null,
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
      user: null,
    });
    sessionStorage.removeItem('user');
  }

  logIn = (user) => {
    this.setState({
      loggedIn: user ? true : false,
      user
    });
  }

  componentDidMount() {
    if (getUser()) {
      this.setState({ user: getUser(), loggedIn: true });
    }
  }

  render() {
    return (
      <Router>
        {this.state.loggedIn ? this.loggedInRoutes() : this.loggedOutRoutes()}
      </Router>
    ); 
  }

  loggedInRoutes() {
    return (
      <HomeNavbar logOut={this.logOut}>
        <Route path="/" component={Home}/>
      </HomeNavbar>
    );
  }

  loggedOutRoutes() {
    return (
      <div className="wrap">
        <Route exact path="/" render={() => <div><Login onLogin={this.logIn} /></div>} />
        <Route exact path="/app/signup" component={SignUp}/>
      </div>
    );
  }
}

// const App = () => (
//   <Router>
//     {/* getUser() ? loggedInRoutes() : loggedOutRoutes()}   */}
//     <div className="wrap">
//     <Route exact path="/" component={Login}/>
//     <Route exact path="/app/signup" component={SignUp}/>
//   </div>
//   </Router>
// )

export default App;
