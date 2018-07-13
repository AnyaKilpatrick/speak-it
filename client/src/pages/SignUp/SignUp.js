import React, {Component} from "react";
// import Logo from "./../../components/Logo";
import SignUpForm from "./../../components/SignUpForm";
import "./SignUp.css";

class SignUp extends Component {



    render(){
        return(
            <div id="paperWhrap">
                <div>
                    <SignUpForm/>
                </div>
            </div>
        )
    }
}

export default SignUp;