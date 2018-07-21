import React, {Component} from "react";
import { Redirect, Link } from "react-router-dom";
import "./SignUpForm.css";
import API from "./../../utils/API";
import { withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Countries from "./../../countries.json";
import FormControl from '@material-ui/core/FormControl';

//overriding /styling
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginTop:0,
      marginBottom:0
    
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
    },
    selectLabel: {
        fontFamily: "'Cabin Sketch', cursive",
        fontWeight: "bold",
        fontSize:18,
        marginLeft:10
    },
    myBtn: {
        background:"rgba(0, 0, 0, 0.027)",
        color:"grey"
    },
    formControl: {
        width:"100%"
    },
    selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    link:{
        marginTop:5,
        textDecoration: "none",
        color:"black"
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
        aboutUser:"",
        options: Countries,
        redirectTo: null
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(name + value)
    }
    
    saveNewUser = () => {
        
        const {fullname, username, nativeLang, country, age, password, aboutUser} = this.state;
        const userObject = { 
            password: password.trim(), 
            username: username.trim(), 
            fullname:fullname.trim(), 
            nativeLang: nativeLang.trim(), 
            country, 
            age, 
            aboutUser:aboutUser.trim()
        };
        API.saveNewUser(userObject)
            .then(res=>{
                console.log("saved "+ JSON.stringify(res));
                if(res.data === "OK") {
                    console.log("server return OK status, because this username already is in db")
                }else{
                    console.log("seems like this username wasn't used before.yay!")
                    this.setState({redirectTo: "/"});
                }
                
            })
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
        if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
        return(
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item xs={11} sm={10} md={6} lg={5} xl={4}>
                    <Grid id="form" container spacing={16} direction="row" alignItems="center" justify="center">
                        {/* <form fullWidth noValidate autoComplete="off"> */}
                            {/* FULL NAME */}
                            <Grid item xs={10} sm={5} md={5} lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="fullname"
                            value={this.state.fullname}
                            label="Full Name"
                            className={this.props.classes.textField}
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            fullWidth
                            />
                            </Grid>
                            {/* USERNAME */}
                            <Grid item xs={10} sm={5} md={5} lg={5}>
                            <TextField
                            onChange={this.handleChange}
                            name="username"
                            value={this.state.username}
                            label="Username"
                            className={this.props.classes.textField}
                            margin="normal"
                            InputProps={inputStyles}
                            InputLabelProps={inputLabel}
                            fullWidth
                            />
                            </Grid>
                            {/* LANGUAGE */}
                            <Grid item xs={10} sm={5} md={5} lg={5}>
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
                            fullWidth
                            />
                            </Grid>
                            {/* COUNTRY */}
                            <Grid item xs={10} sm={5} md={5} lg={5} >
                            <FormControl className={this.props.classes.formControl} fullWidth>
                                <InputLabel className={this.props.classes.selectLabel} fullWidth>Country</InputLabel>
                                <Select
                                fullWidth
                                native
                                onChange={this.handleChange}
                                name="country"
                                value={this.state.country}
                                // label="Country"
                                className={this.props.classes.textField}
                                // margin="normal"
                                // InputProps={inputStyles}
                                >
                                <option value="" />
                                {this.state.options.map((option)=>
                                    <option value={option.name} key={option.code}>{option.name}</option>
                                )}/>
                                </Select>
                            </FormControl>
                            </Grid>
                            {/* AGE */}
                            <Grid item xs={10} sm={5} md={5} lg={5}>
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
                            fullWidth
                            />
                            </Grid>
                            {/* Password */}
                            <Grid item xs={10} sm={5} md={5} lg={5}>
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
                            fullWidth
                            />
                            </Grid>
                            {/* About */}
                            <Grid item xs={9} sm={10} md={10} lg={10} xl={9}>
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
                            <Grid item xs={11} sm={11} md={11} lg={11} align="center" className={this.props.classes.btnGrid}>
                                <Button 
                                    size="large" 
                                    // variant="outlined"
                                    className={this.props.classes.myBtn}
                                    // color="primary"
                                    onClick={this.saveNewUser}
                                    >
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10} align="center" className={this.props.classes.btnGrid}>
                                <Link to="/" className={this.props.classes.link}>
                                Already have account?
                                </Link>
                            </Grid>
                    {/* </form> */}
                </Grid>
            </Grid>
          </Grid>
        )
    }
}

export default withStyles(styles)(SignUpForm);
