import axios from "axios";

export default {
    saveNewUser: function(userObject){
        return axios.post("/api/user", userObject);
    }
}