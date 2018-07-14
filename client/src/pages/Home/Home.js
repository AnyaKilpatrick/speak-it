import React, { Component } from 'react';

import "./Home.css";
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

//   setUserOnline = () => {
//     const userId = this.state.user._id;
//     API.checkLoggedInUser()
//     .then((res)=>{
//         console.log("ID", res.data._id);
//         this.setState({userId:res.data._id}, ()=>{
//             this.props.socket.emit("user is online", {userId: this.state.userId});
//             console.log('sent "user is online" event to the server');
//         })
//     })
//     .catch(err=>console.log(err));
//   }

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
