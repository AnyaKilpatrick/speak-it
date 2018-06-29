import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
// import VectorMap from "react-jvectormap";

import "./MyProfile.css";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    demo: {
      height: 240,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      height: '100%',
      color: theme.palette.text.secondary,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });

class MyProfile extends Component {



    render(){
        const { classes } = this.props;

        return(
            <div>
                <h1>My Profile!YAY</h1>
                <p>My name is {this.props.fullname}</p>
                <p>I am from {this.props.country}</p>

                <p>My native language is {this.props.nativeLang}</p>
                <p>About me: {this.props.about}</p>
            </div>
        )
    }

}

export default MyProfile;