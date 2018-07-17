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
import MessagesPage from "./pages/MessagesPage";
import Messages from "./components/Messages";
//socket
import openSocket from "socket.io-client";
// const socket = openSocket("http://localhost:8000");
const socket = openSocket("https://speak-it-2.herokuapp.com");



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
    socket.emit("user is offline");
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
    <HomeNavbar logOut={this.logOut} socket={socket}>
      <Switch>
        <Route exact path="/" render={() => <div><Home socket={socket} /></div>}/>
        <Route exact path="/search" component={FriendsSearch}/>
        <Route exact path="/friends" component={Friends}/>
        <Route path="/user/:id" component={FriendProfile}/>
        <Route exact path="/messages" render={() => <div><MessagesPage socket={socket} /></div>}/>
        <Route path="/messages/:id" render={({ match }) => <Messages match={match} socket={socket}/>}/>
        {/* <Route path="/messages/:id" component={Messages} socket={socket}/> */}
        {/* <Route path="/messages/:id" render={props => <Messages socket={socket}/>}/> */}
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
