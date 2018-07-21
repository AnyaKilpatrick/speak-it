import React, {Component} from "react";
import FriendsNavigation from "./../../components/FriendsNavigation";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import API from "../../utils/API";
import FriendList from "../../components/FriendList"
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { getUser } from '../../utils/Auth';
import Countries from "./../../countries.json";

const styles = theme=> ({
    root: {
        width: "60%",
        margin: "auto",
        [theme.breakpoints.down('md')]: {
            width:"80%"
        },
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            margin:0
        },
        [theme.breakpoints.down('xs')]: {
            width:"100%",
            margin:0,
            height:80
        }
    },
    navigation:{
        width:"60%",
        margin:"auto",
        [theme.breakpoints.down('md')]: {
            width:"80%"
        },
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            margin:0
        },
        [theme.breakpoints.down('xs')]: {
            width:"100%",
            margin:0,
            height:80
        }
    },
    avatarOffline:{
        border:"solid 3px #b3b3b3",
        [theme.breakpoints.down('md')]: {
            width:20,
            height:20
        },
        [theme.breakpoints.down('sm')]: {
            width:15,
            height:15
        }
    },
      avatarOnline:{
        border:"solid 3px #40b140",
        [theme.breakpoints.down('md')]: {
            width:20,
            height:20
        },
        [theme.breakpoints.down('sm')]: {
            width:15,
            height:15
        }
    },
    listCSS:{
        width:"100%"
    }
  });

class Friends extends Component {

    state = {
        friend:[],
        pending:[],
        requests:[],
        currentArray:[],
        page: "friends",
        disabled: false,
        countries: Countries
    }
    showFriends = () => {
        this.setState({page: "friends"}, ()=>{
            this.showListItems();
        });
    }
    showRequests = () => {
        this.setState({page: "requests"}, ()=>{
            this.showListItems();
        });
    }
    showSentRequests = () => {
        this.setState({page: "sentRequests"}, ()=>{
            this.showListItems();
        });
    }

    componentDidMount = () => {
        this.apiCall();
    }

    apiCall = () => {
        API.getFriendsInfo()
        .then(res=> {
            console.log("populated user response %O", res.data);
            const {friend, pending, requests} = res.data.local;
            this.setState({friend, pending, requests}, ()=>{
                this.showListItems();
            });
        })
        .catch(err=>console.log(err))
    }

    addFriend = (event) => {
        console.log("clicked 'add friend' btn");
        const friendId = event.target.parentNode.parentNode.id;
        console.log(event.target.parentNode.parentNode.id);
        API.acceptFriend(friendId)
        .then((res)=> {
            console.log(res);
            this.apiCall(); //mongodb had a lot of changes after this, so we need to load fresh information
        })
        .catch(err=>console.log(err));
    }


    showListItems = () => {
        if(this.state.page === "friends"){
            const array = this.state.friend;
            console.log("friends array ",array);
            this.setState({currentArray: array});
        }
        else if(this.state.page === "requests"){
            const array = this.state.requests;
            console.log("requests array "+array);
            this.setState({currentArray: array});
        }
        else if (this.state.page === "sentRequests"){
            const array = this.state.pending;
            this.setState({currentArray: array}, ()=>{
                console.log("pending array "+this.state.currentArray);
            });
        }
    }
    
    addChatIcon = (userId) => {
        if(this.state.page==="friends"){
            return(
                <Tooltip id="tooltip-fab" title="Chat">
                    <IconButton id={userId} aria-label="chat">
                        <Icon>chat</Icon>
                    </IconButton>
                </Tooltip>
            )
        }

    }

    addIcon = (userId) => { //iconutton for accapting a friend request
        const { classes } = this.props;
        if(this.state.page==="requests"){
            return(
                <Tooltip id="tooltip-fab" title="Accept Request">
                    <IconButton id={userId} aria-label="accept request"  onClick={this.addFriend}>
                    <Icon>how_to_reg</Icon>
                    </IconButton>
                </Tooltip>
              )
        }
    }
    loadAvatar = (country) => {
        const countries = [...this.state.countries];
        let countryCode;
        for(let c=0;c<countries.length;c++){
            if (countries[c].name === country){
              countryCode = countries[c].code;
            }
          }
          const src = "http://www.geonames.org/flags/x/"+countryCode.toLowerCase()+".gif"
          return src;
    }

    render(){
        const { classes } = this.props;
 
        return (
            <div>
                <FriendsNavigation 
                    showFriends={this.showFriends}
                    showRequests={this.showRequests}
                    showSentRequests={this.showSentRequests}
                    classes={{root: classes.navigation}}
                />
                <div className={classes.root}>
                    <List classes={{root:classes.listCSS}}>
                        {this.state.currentArray.map((friend, index)=>
                            <FriendList
                            avatarCSS = {friend.online === true? classes.avatarOnline : classes.avatarOffline} 
                            loadAvatar={this.loadAvatar(friend.local.country)}
                            profileId={friend._id}
                            userId = {friend._id}
                            key={index}
                            friendName = {friend.local.fullname}
                            >
                            {this.addChatIcon(friend._id)}
                            {this.addIcon(friend._id)}
                            </FriendList>
                        )}
                    </List>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Friends);