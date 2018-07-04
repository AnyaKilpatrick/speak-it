import axios from "axios";

export default {
    saveNewUser: function(userObject){
        return axios.post("/app/signup", userObject);
    },
    loginUser: function(userObject){
        return axios.post("/login", userObject);
    },
    checkLoggedInUser: function(){
        return axios.get("/app/profile");
    },
    logout: function(){
        return axios.get("/app/logout");
    },
    findUsersByCountry: function(country){
        return axios.get("app/searchUsers/"+country)
    },
    findUserInfo: function(query){
        return axios.get("/api/user/"+query);
    },
    sendFriendRequest: function(friendId){
        console.log("passing id " + friendId);
        return axios.post("/api/request/"+friendId);
    },
    getFriendsInfo: function(){
        return axios.get("/api/friends");
    },
    acceptFriend: function(friendId){
        return axios.post("/api/acceptfriend/"+friendId);
    }

}