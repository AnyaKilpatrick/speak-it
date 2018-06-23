import React, {Component} from "react";
import "./SignUpForm.css";
import API from "./../../utils/API";

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
//overriding /styling
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    
    },
    myInputs: {
        fontFamily: "'Cabin Sketch', cursive",
        fontWeight: "bold",
        fontSize:20
    },
    myLabels: {
        fontFamily: "'Cabin Sketch', cursive",
        fontWeight: "bold",
        fontSize:18,
        // '&$cssFocused': {
        //     color: "pink",
        //   },
        // '&:after': {
        // borderBottomColor: "pink",
        // }
    },
    myBtn: {
        marginTop:20,
        marginBottom: 20,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: "linear-gradient(45deg, rgba(92, 31, 94, 0.466) 30%, rgb(31, 30, 29) 90%)",
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        boxShadow: "0 3px 5px 2px rgba(69, 29, 82, 0.3)",
        color:"white"
    }
  });
class SignUpForm extends Component {

    state = {
        fullname: "",
        username: "",
        nativeLang: "",
        country: "",
        age: "",
        password: "",
        aboutUser:""
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    
    saveNewUser = () => {
        const {fullname, username, nativeLang, country, age, password, aboutUser} = this.state;
        const userObject = {fullname, username, nativeLang, country, age, password, aboutUser};
        API.saveNewUser(userObject)
            .then(res=>console.log("saved "+ res))
            .catch(err=>console.log(err))
    }


    render(){
        const inputStyles = {
            classes: {
              input: this.props.classes.myInputs,
            }
        }
        const inputLabel = {
            classes: {
                root: this.props.classes.myLabels,
            }
        }

        return(
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item lg={5}>
                    <Grid id="form" container direction="row" justify="center">
                        {/* <form fullWidth noValidate autoComplete="off"> */}
                            {/* FULL NAME */}
                            <Grid item lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="fullname"
                            value={this.state.fullname}
                            label="Full Name"
                            className={this.props.classes.textField}
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            />
                            </Grid>
                            {/* USERNAME */}
                            <Grid item lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="username"
                            value={this.state.username}
                            label="Username"
                            className={this.props.classes.textField}
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            />
                            </Grid>
                            {/* LANGUAGE */}
                            <Grid item lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="nativeLang"
                            value={this.state.nativeLang}
                            label="Native language"
                            // helperText="You can add later more languages"
                            className={this.props.classes.textField}
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            />
                            </Grid>
                            {/* COUNTRY */}
                            <Grid item lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="country"
                            value={this.state.country}
                            label="Country"
                            className={this.props.classes.textField}
                            //   placeholder="Placeholder"
                            //   helperText="Full width!" HELPER text can be used to display error (validation rules)
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            />
                            </Grid>
                            {/* AGE */}
                            <Grid item lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="age"
                            value={this.state.age}
                            id="number"
                            label="Age"
                            type="number"
                            className={this.props.classes.textField}
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            />
                            </Grid>
                            {/* Password */}
                            <Grid item lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="password"
                            value={this.state.password}
                            label="Password"
                            className={this.props.classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            />
                            </Grid>
                            {/* About */}
                            <Grid item lg={10}>
                            <TextField
                            onChange={this.handleChange}
                            name="aboutUser"
                            value={this.state.aboutUser}
                            label="Write About Yourself"
                            multiline
                            margin="normal"
                            fullWidth
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            />
                            </Grid>
                            <Grid item lg={10} align="center">
                                <Button 
                                    size="large" 
                                    variant="outlined"
                                    className={this.props.classes.myBtn}
                                    color="primary"
                                    href="#text-buttons"
                                    onClick={this.saveNewUser}
                                    >
                                    Sign Up
                                </Button>
                            </Grid>
                    {/* </form> */}
                </Grid>
            </Grid>
          </Grid>
        )
    }
}

export default withStyles(styles)(SignUpForm);
