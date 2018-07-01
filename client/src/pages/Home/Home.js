import React, { Component } from 'react';
import API from "./../../utils/API";
import "./Home.css";

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Map from "./../../components/Map";
import MyProfile from "./../../components/MyProfile";

class Home extends Component {
  state = {
      user: null,
      loggedIn: false,
  };

  componentDidMount() {
      if (sessionStorage.user) {
          this.setState({ user: sessionStorage.user, loggedIn: true });
      }
  }


    render(){
    const { classes, theme } = this.props;
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
