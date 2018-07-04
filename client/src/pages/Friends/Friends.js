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

const styles = {
    root: {
      width: 800,
      margin: "auto"
    },
  };

class Friends extends Component {

    state = {
        friend:[],
        pending:[],
        requests:[],
        currentArray:[],
        page: "friends",
        disabled: false
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
        API.getFriendsInfo()
        .then(res=> {
            console.log("populated user response %O", res.data);
            const {friend, pending, requests} = res.data.local;
            this.setState({friend, pending, requests});
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
        })
        .catch(err=>console.log(err));
    }


    showListItems = () => {
        if(this.state.page === "friends"){
            const array = this.state.friend;
            console.log("friends array "+array);
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
        else if(this.state.page === "friends"){
            return(
                <Tooltip id="tooltip-fab" title="Delete Friend">
                    <IconButton id={userId} aria-label="delete friend">
                        <Icon>delete</Icon>
                    </IconButton>
                </Tooltip>
              )
        }
    }

    render(){
        const { classes } = this.props;
 
        return (
            <div>
                <FriendsNavigation 
                    showFriends={this.showFriends}
                    showRequests={this.showRequests}
                    showSentRequests={this.showSentRequests}
                />
                <div className={classes.root}>
                    <List>
                        {this.state.currentArray.map((friend, index)=>
                            <FriendList
                            profileId={friend._id}
                            userId = {friend._id}
                            key={index}
                            friendName = {friend.local.fullname}
                            >
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