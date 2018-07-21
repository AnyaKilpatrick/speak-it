import React, { Component } from 'react';

import Map from "./../../components/Map";
import MyProfile from "./../../components/MyProfile";

class Home extends Component {
  state = {
      user: null,
      loggedIn: false,
      userId:null
  };

  componentDidMount() {
      if (sessionStorage.user) {
          this.setState({ user: sessionStorage.user, loggedIn: true });
      }
  }

    render(){
        if (this.state.user){
            console.log("user user user "+ this.state.user);
            const user = JSON.parse(this.state.user);
            return (
                <MyProfile fullname={user.fullname} country={user.country} nativeLang={user.nativeLang} about={user.aboutUser}>
                    <Map/>
                </MyProfile>
            );
        }
        return (<h1>Profile</h1>)

    }
};

export default Home;
