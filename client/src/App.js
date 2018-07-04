import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from './pages/SignUp';
import Profile from "./pages/Profile";
import { getUser } from './utils/Auth';
import HomeNavbar from './components/HomeNavbar';
import FriendsSearch from "./pages/FriendsSearch";
import Friends from "./pages/Friends";
import API from "./utils/API";
import FriendProfile from "./pages/FriendProfile";

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
    API.logout();
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
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/search" component={FriendsSearch}/>
        <Route exact path="/friends" component={Friends}/>
        <Route path="/user/:id" component={FriendProfile}/>
      </Switch>
      </HomeNavbar>
    );
  }

  loggedOutRoutes() {
    return (
      <div className="wrap">
      <Switch>
        <Route exact path="/" render={() => <div><Login onLogin={this.logIn} /></div>} />
        <Route exact path="/app/signup" component={SignUp}/>
        <Route render={() => <div><Login onLogin={this.logIn} /></div>}/>
      </Switch>
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
