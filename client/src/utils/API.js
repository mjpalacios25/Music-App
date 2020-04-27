import axios from "axios";

export default {
    getUsers: function() {
        return axios.get("/api/users")
    },

    getSingleUser: function(id){
        return axios.get("/api/users/" + id) //test
    }

}