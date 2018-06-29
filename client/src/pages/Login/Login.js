import React, {Component} from "react";
import "./Login.css";
import LoginInput from "./../../components/LoginInput"
import Logo from "./../../components/Logo";


// import image from "./background.png";

class Login extends Component {


    render(){
        return(
            <div id="wrapper">
                <div id="introPage">
                    <Logo/>
                    <LoginInput onLogin={this.props.onLogin} />
                </div>
            </div>
        )
    }

};

export default Login;