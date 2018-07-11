import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from "../../utils/API";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
  primaryText: {
      fontWeight:"bold"
  },
  secondaryText:{
    //don't know how to make smaller because by default it inherits a parent
  },
  icon:{
      fontSize:18,
      color:"green",
      marginRight:0
  },
  chatDiv:{
      backgroundColor:"#ffffff99",
      borderRadius: 10
  },
  header:{
      fontWeight:"bold",
      margin:"auto"
  },
  listItem:{
      marginBottom:20,
      paddingTop:10,
      paddingBottom:10
  },
chatItem2:{
    marginBottom:20,
    paddingTop:10,
    paddingBottom:10,
    textAlign:"right"
},
  arrowIcon:{
      fontSize:40
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%",
  },
  button: {
    margin: theme.spacing.unit,
  },
  inputStyle:{
      backgroundColor: "white",
      paddingTop:0,
      paddingBottom:0
  },
  avatar:{
    border:"solid 3px #b3b3b3",
    [theme.breakpoints.down('md')]: {
        width:20,
        height:20
    }
  },
  avatar:{
    border:"solid 3px #b3b3b3",
    [theme.breakpoints.down('md')]: {
        width:20,
        height:20
    }
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color:"grey",
    marginTop:40
  },
});

class MessagesPage extends Component {

    timer=null;

    state = {
        page: "chats",
        allChats: [],
        userId: "",
        loaded:false,
        completed:0
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        API.loadChats()
            .then((json) => {
                if(json.data){ //if we get data back
                    console.log("YAY",json)
                    let array = json.data.chats;
                    let newArray=[];
                    const myId=json.data._id;
                    console.log("MYID "+myId);
                    for(let i=0; i<array.length;i++){  //each chat has two participants (logged in user and user's friend)
                        //participant are listed in random order, and we need only friend's information. We find which participant is who, and remove one, leaving only a friend info
                        if(array[i].participants[0]._id === myId){ //if first particpant has id that matched loggen in user id, then remove this participant
                            console.log("has to return true "+ array[i].participants[0]._id);
                            array[i].participants.splice(0, 1);
                            newArray.push(array[i]);
                            console.log("true");
                        }else{
                            console.log("has to return false "+ array[i].participants[0]._id);//if it doesn't match, it means that secont participant is a logged in user
                            array[i].participants.splice(1, 1);
                            newArray.push(array[i]);
                            console.log("false");
                        }
                        console.log("ARRAY", newArray);

                    }
                    this.setState({allChats:newArray, userId: json.data._id, loaded:true},()=>{
                        console.log("Current State:", this.state);
                        console.log(this.state.allChats);
                    })
                }
            })
            .catch(err=>console.log(err));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
      }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  goBack = () => {
      this.setState({page: "chats"});
  }
  openChat = event => {
        this.setState({page:"directChat"});
  }

  render() {
    const { classes } = this.props;

    if(this.state.page === "chats" && this.state.loaded === true){
        return (
        //   <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} sm={8} m={6} lg={6} className={classes.chatDiv}>
                        <List>
                            <ListItem className={classes.listItem}>
                                <ListItemText
                                        primary="Chats"
                                        classes={{primary:classes.header}}
                                    />
                            </ListItem>
                            {this.state.allChats.map((chat, index)=>
                                <ListItem dense button key={index} id={chat._id} className={classes.listItem} onClick={this.openChat}>
                                    <Avatar alt="friend" src="http://www.geonames.org/flags/x/uk.gif" className={classes.avatar} />
                                    <ListItemText 
                                            primary={<Typography>{chat.participants[0].local.fullname}</Typography>}
                                            secondary="Hello, how are .."
                                            classes={{primary:classes.primaryText}}

                                        />
                                        {/* <ListItemIcon>
                                            <Icon className={classes.icon}>
                                            person
                                            </Icon>
                                        </ListItemIcon> */}
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                </Grid>
        );
    }else if(this.state.page==="directChat"){
        return(
            <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={8} m={6} lg={6} className={classes.chatDiv}>
                <List>
                    <ListItem className={classes.listItem}>
                        <Tooltip id="tooltip-fab" title="Go back">
                            <IconButton aria-label="go back" onClick={this.goBack}>
                                <Icon className={classes.arrowIcon}>arrow_left</Icon>
                            </IconButton>
                        </Tooltip>
                        <ListItemText
                                primary="Your friend's name"
                                classes={{primary:classes.header}}
                            />
                    </ListItem>
                    {/* loop through messages here */}
                    <ListItem dense button onClick={this.openChat}>
                    <Avatar alt="friend" src="http://www.geonames.org/flags/x/uk.gif" />
                    <ListItemText 
                            primary="Hi, how are you???"
                            secondary="Sunday, 4:50pm"
                            classes={{primary:classes.primaryText, secondary:classes.secondaryText}}

                        />
                    </ListItem>
                    <ListItem dense button className={classes.chatItem2} onClick={this.openChat}>
                    <ListItemText 
                            primary="I am great, and you???"
                            secondary="Sunday, 4:50pm"
                            classes={{primary:classes.primaryText, secondary:classes.secondaryText}}

                        />
                    <Avatar alt="friend" src="http://www.geonames.org/flags/x/uk.gif" />
                    </ListItem>
                </List>
                <List className={classes.inputStyle}>
                    <ListItem>
                        <TextField
                                id="textarea"
                                label="Message"
                                multiline
                                className={classes.textField}
                                margin="normal"
                            />
                        <IconButton  color="default" className={classes.button}>
                            <Icon className={classes.rightIcon}>send</Icon>
                        </IconButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
        )
    }else{
        return(
            <Grid container direction="row" justify="center" alignItems="Center">
                <Grid item>
                    <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    size={80}
                    value={this.state.completed}
                    />
                </Grid>
            </Grid>
        )

    }
  }
}

MessagesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessagesPage);