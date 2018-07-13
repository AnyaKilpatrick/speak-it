import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Link } from "react-router-dom";

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
import { getUser } from '../../utils/Auth';

const styles = theme => ({
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

class Messages extends Component {

    state = {
        loaded: false,
        chatId: "",
        myId:"",
        friendInfo:{},
        myInfo:{},
        messages:[],
        text:""
    }

    componentDidMount() {
        console.log("hmm", this.props);
        const {match:{params}} = this.props;
        
        console.log(params.id);
        const chatId=params.id;
        API.loadMessages(chatId)
        .then(res=>{
            if(res.data){
                console.log("Messages",res);
                let newChatInfo = res.data.chatInfo[0];

                if(newChatInfo.participants[0]._id === res.data.myId){
                    newChatInfo.participants.splice(0, 1);
                }else{
                    newChatInfo.participants.splice(1, 1);
                }

                this.setState({
                    chatId: params.id,
                    myId: res.data.myId,
                    friendInfo:  newChatInfo.participants[0],
                    myInfo: getUser(),
                    messages:res.data.chatInfo[0].messages,
                    loaded: true
                },()=>{
                    console.log("STATE", this.state);
                    this.props.socket.emit("join room", {chatId: this.state.chatId});
                })
            }
        })
        .catch(err=>console.log(err));

        // configure component to add new messages to the list when it receives one
        this.props.socket.on("receivedMsg", (data) => {

            console.log(data.msg);
            let array = [...this.state.messages];
            let msgInfo = {
                author: data.name,
                text: data.msg,
                time: data.time
            }
            array.push(msgInfo);
            
            this.setState({messages: array}, ()=>{
                console.log("updated messages", this.state.messages);
            });
        });
    }

    componentWillUnmount(){
        this.props.socket.emit("leave room", {chatId: this.state.chatId});
    }

    handleChange = event => {
        const {value} = event.target;
        this.setState({text: value}, ()=>{
            // console.log(this.state.text);
        })
    }

    sendMessage = () => {
        const object = {
            chatId: this.state.chatId,
            message: this.state.text,
            name: this.state.myInfo.fullname,
            myId:this.state.myId
        }
        this.props.socket.emit("send msg", object);
    }



    render(){
        const { classes } = this.props;
        if(this.state.loaded === true){
            return(
                <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={8} m={6} lg={6} className={classes.chatDiv}>
                    <List>
                        <ListItem className={classes.listItem}>
                            <Tooltip id="tooltip-fab" title="Go back">
                            <Link to="/messages">
                                {/* <IconButton aria-label="go back" onClick={this.goBack}> */}
                                    <Icon className={classes.arrowIcon}>arrow_left</Icon>
                                {/* </IconButton> */}
                                </Link>
                            </Tooltip>
                            <ListItemText
                                    primary="Your friend's name"
                                    classes={{primary:classes.header}}
                                />
                        </ListItem>
                        {this.state.messages.map((message, index)=>
                            <ListItem key={index} ense button>
                                <Avatar alt="friend" src="http://www.geonames.org/flags/x/uk.gif" />
                                <ListItemText 
                                        primary={message.text}
                                        secondary={message.time}
                                        classes={{primary:classes.primaryText, secondary:classes.secondaryText}}
                                    />
                            </ListItem>
                        )}

                        {/* 
                        <ListItem dense button className={classes.chatItem2} onClick={this.openChat}>
                        <ListItemText 
                                primary="I am great, and you???"
                                secondary="Sunday, 4:50pm"
                                classes={{primary:classes.primaryText, secondary:classes.secondaryText}}

                            />
                        <Avatar alt="friend" src="http://www.geonames.org/flags/x/uk.gif" />
                        </ListItem> */}
                    </List>
                    <List className={classes.inputStyle}>
                        <ListItem>
                            <TextField
                                    id="textarea"
                                    label="Message"
                                    multiline
                                    className={classes.textField}
                                    margin="normal"
                                    value={this.state.text}
                                    onChange={this.handleChange}
                                />
                            <IconButton  color="default" className={classes.button} onClick={this.sendMessage}>
                                <Icon className={classes.rightIcon}>send</Icon>
                            </IconButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            )
        }else if(this.state.loaded === false){
            return(
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                    <CircularProgress className={classes.progress} size={50} />
                    </Grid>
                </Grid>
            )
        }
    }
}

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Messages);