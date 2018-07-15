import axios from "axios";

export default {
    countryInformation: function(country){
        return axios.get("https://restcountries.eu/rest/v2/name/"+country+"?fullText=true");
        console.log("https://restcountries.eu/rest/v2/name/"+country+"?fullText=true");
    },
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
    },
    createChatroom: function(object){
        return axios.post("/api/createChatroom", object);
    },
    loadChats: function(){
        return axios.get("/api/loadChats");
        // return fetch('/api/loadChats', { credentials: 'same-origin' }).then(res => res.json());
    },
    loadMessages: function(chatId){
        return axios.get("/api/loadchat/"+chatId);
    }

}