import React, { Component } from 'react';
import "./LoginInput.css";
import API from "./../../utils/API";
import { Redirect } from "react-router-dom";

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
        marginRight: 20
    },
    loginBtn: {
        marginTop: 15
    }
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
    this.setState({ [name]: value });
    console.log(name + " " + value);
    };

    handleUsername = event => {
        console.log(event.target.name);
        this.setState({username: event.target.value});
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
        API.loginUser(userObject)
            .then(res=>{
                console.log("login response %O", res.data);
                
                if(res.data === "OK") {
                    console.log("server return OK status, because this username doesn't exist or password was wrong")
                }else{
                    console.log("seems like this username and password match!yay!");
                    sessionStorage.user = JSON.stringify(res.data.local);
                    this.props.onLogin(res.data.local);
                    this.setState({redirectTo: "/app/profile"});
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
                    <Grid item lg={2} className={this.props.classes.inputColumn}> 
                        <TextField 
                            id="input-with-icon-grid"
                            label="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange} 
                        fullWidth/>
                    </Grid>
                    <Grid item lg={2}>
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
                    <Button href="#text-buttons" className={this.props.classes.loginBtn} onClick={this.loginUser}>
                        Log In
                    </Button>
                    <Button href="/app/signup" className={this.props.classes.loginBtn}>
                        Don't have account?
                    </Button>
                </Grid>
            </div>
        )
    }
};

export default withStyles(styles)(LoginInput);