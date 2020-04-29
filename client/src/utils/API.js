import axios from "axios";

export default {
    getUsers: function() {
        return axios.get("/api/users")
    },
    registerUser: function() {
        return axios.post("/api/users/")
    },
    loginUser: function () {
        return axios.post("/api/users/login")
    }

 
}