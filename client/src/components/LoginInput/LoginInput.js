import React, { Component } from 'react';
import "./LoginInput.css";
import API from "./../../utils/API";
import { Redirect, Link } from "react-router-dom";

//username input compenents
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

//password input components
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';

//button
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    inputColumn: {
        // marginRight: 20
        [theme.breakpoints.up('sm')]: {
            marginRight:20
        }
    },
    loginBtn: {
        marginTop: 25
    },
    goToSignup:{
        textDecoration:"none",
        color:"grey",
        position:"relative",
        top: 12,
        fontFamily: "'Cabin Sketch', cursive"
    }

        // [theme.breakpoints.down('md')]: {
});

class LoginInput extends Component {

    state = {
      password: "",
      username:"",
      showPassword: false,
      redirectTo: null
    };

    handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value.trim() });
    // console.log(name + " " + value);
    };

    handleUsername = event => {
        console.log(event.target.name);
        this.setState({username: event.target.value.trim()});
        console.log(this.state.username);
    }

    handleMouseDownPassword = event => {
    event.preventDefault();
    };

    handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
    };

    loginUser = () => {
        const {username, password} = this.state;
        const userObject = {username, password};
        console.log("pressed btn");
        API.loginUser(userObject)
            .then(res=>{
                console.log("login response %O", res.data);
                
                if(res.data === "OK") {
                    console.log("server return OK status, because this username doesn't exist or password was wrong")
                }else{
                    console.log("seems like this username and password match!yay!");
                    sessionStorage.user = JSON.stringify(res.data.local);
                    this.props.onLogin(res.data.local);
                    this.setState({redirectTo: "/"});
                }
            })
            .catch(err=> console.log(err))
    };

    render(){
        if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
        return (
            <div>
                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid item xs={7} sm={3} md={2} lg={2} xl={1} className={this.props.classes.inputColumn}> 
                        <TextField 
                            id="input-with-icon-grid"
                            label="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            className={this.props.usernameInput} 
                        fullWidth/>
                    </Grid>
                    <Grid item xs={7} sm={3} md={2} lg={2} xl={1}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password"
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" justify="center">
                <Grid item xs={7} sm={3} md={2} lg={1} xl={1}>
                    <Button onClick={this.loginUser} className={this.props.classes.loginBtn} >
                        Log In
                    </Button>
                </Grid>
                <Grid item xs={7} sm={3} md={2} lg={2} xl={1}>
                    <Link to="/app/signup" className={this.props.classes.goToSignup}>
                        Don't have account?
                    </Link>
                </Grid>
                </Grid>
            </div>
        )
    }
};

export default withStyles(styles)(LoginInput);