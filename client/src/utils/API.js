import axios from "axios";

export default {
    getUsers: function() {
        return axios.get("/api/users")
    },

    getSingleUser: function(id){
        return axios.get("/api/users/" + id) 
    },

    registerUser: function(req) {
        console.log(req);
        return axios.post("/api/users/", req)
    },

    loginUser: function (req) {
        console.log("API " + JSON.stringify(req))
        return axios.post("/api/users/login", req)
    },
    
    getPlaylists: function(id){
        return axios.get("/api/users/playlists/" + id)
    },

    createPlaylist: function(id, playlist){
        return axios.post("/api/users/" + id, playlist)
    },

    removePlaylist: function(id){
        return axios.delete("/api/users/" + id)
    },

    updatePlaylist: function(id, song){
        return axios.put("/api/users/playlists/" + id, song)
    },

    // removeSong: function(id, song){
    //     return axios.put("/api/users/playlists/songs" + id, song)
    // },

    logoutUser: function(){
        return axios.post("/api/users/logout");
    }
}