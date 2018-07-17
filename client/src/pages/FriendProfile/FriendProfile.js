import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
// import VectorMap from "react-jvectormap";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Countries from "./../../countries.json";
import API from "../../utils/API";
import CircularProgress from '@material-ui/core/CircularProgress';

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
    mapDiv:{
      height: "100vh"
    },
    userInfoDiv:{
      // backgroundColor:"rgba(255, 255, 255, 0.299)",
      // borderRadius: 25,
      // backgroundImage: "url('./images/plane.jpg')",
      marginTop:40,
      // backgroundColor: "rgba(0, 0, 0, 0.168)",
      marginTop:-100,
      height: "100%",
      border:0,
      marginLeft:0,
      marginRight:0
    },
    userName:{
      fontFamily:"'Cabin Sketch', cursive",
      color:"#4d4d62"
    },
    userInfo:{
      fontFamily:"'Cabin Sketch', cursive",
      color:"#3a3a41"
    },
    infoDiv:{
      [theme.breakpoints.down('sm')]: {
        marginTop: 90,
        marginLeft:30
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: 20,
        marginLeft:"20%"
      },
    }
    // avatar: {
    //   margin: 10,
    //   width:200,
    //   height:200,
    //   border: "solid 5px black"
    // }
  });

class MyProfile extends Component {

    state = {
      countries: Countries,
      user: null,
      countryCode:"",
      imageSrc: "",
      loaded:false
    }

    componentDidMount() {

        const {match:{params}} = this.props;
        console.log(params.id);
        API.findUserInfo(params.id)
        .then(res=>{
            console.log("Friend Profile",res);
            if(res.data){
                const userCountry = res.data[0].local.country;
                const countries = this.state.countries;
                let countryCode;
                for(let c=0;c<countries.length;c++){
                if (countries[c].name === userCountry){
                    countryCode = countries[c].code;
                }
                }
                const src = "http://www.geonames.org/flags/x/"+countryCode.toLowerCase()+".gif";
        
                this.setState({ 
                user: res.data[0].local,
                countryCode: countryCode,
                imageSrc: src,
                loaded:true
                });
            }
        })
        .catch(err=> console.log(err));
    }

    render(){
        const {classes} = this.props;
        if(this.state.loaded===true){
            return(
                <Grid container direction="row" spacing={16}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={this.props.classes.userInfoDiv}>
                    <Grid container direction="row" spacing={16} justify="center">
                        <Grid item xs={8} sm={4} md={10} lg={10} xl={10}>
                        {/* <Avatar alt="Remy Sharp" src="http://www.geonames.org/flags/x/af.gif" className={this.props.classes.avatar} /> */}
                        <img id="myAvatar" src={this.state.imageSrc}/>
                        </Grid>
                        <Grid className={classes.infoDiv} item xs={12} sm={6} md={10} lg={10} xl={10}>
                        <h1 className={classes.userName}>{this.state.user.fullname}</h1>
                        <h3 className={classes.userInfo}>Country: {this.state.user.country}</h3>
                        <h3 className={classes.userInfo}>Native language: {this.state.user.nativeLang}</h3>
                        <h3 className={classes.userInfo}>About me: {this.state.user.aboutUser}</h3>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} >
                    <Grid container spacing={16} justify="center">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={this.props.classes.mapDiv}>
                        {this.props.children}
                    </Grid>
                    </Grid>
                </Grid>
                </Grid>
            )
        }else{
            return(
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <p className={this.props.classes.pTag}>Loading map..</p>
                        <CircularProgress className={this.props.classes.progress} size={50} />
                    </Grid>
                </Grid>
            )
        }
    }

}

export default withStyles(styles)(MyProfile);