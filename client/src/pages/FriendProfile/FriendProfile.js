import React, {Component} from "react";
import API from "../../utils/API";

class FriendProfile extends Component {

    componentDidMount = () => {
        const {match:{params}} = this.props;
        console.log(params.id);
        // API.findUserInfo().then()
    }

    render(){
        return(
            <h1>Hello</h1>
        )
    }
}

export default FriendProfile;