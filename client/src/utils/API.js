import axios from "axios";

export default {
    getUsers: function() {
        return axios.get("/api/users")
    },
    registerUser: function(req) {
        console.log(req);
        return axios.post("/api/users/", req)
    },

    loginUser: function (req) {
        console.log("API " + JSON.stringify(req))
        return axios.post("/api/users/login", req)
    }
}