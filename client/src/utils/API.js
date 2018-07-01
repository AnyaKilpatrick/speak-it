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
    }
}