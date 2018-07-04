import React, {Component} from "react";
import FriendsNavigation from "./../../components/FriendsNavigation";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import API from "../../utils/API";
import FriendList from "../../components/FriendList"
import List from '@material-ui/core/List';

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
        page: "friends"
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
                            key={index}
                            friendName = {friend.local.fullname}
                            />
                        )}
                    </List>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Friends);