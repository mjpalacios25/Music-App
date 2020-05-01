<<<<<<< HEAD
import React, { Component } from 'react';
import Playlists from '../components/UserPlaylists'
=======
>>>>>>> 64ead66a29148bc74871be7e2bb76acedb1599c9

import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

import Waveform from "../components/Wavesurfer"
class Profile extends Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = {
            username: props.updateUser.username,
            _id: props.updateUser._id
=======
        console.log(props.username)
        console.log(props._id)
        this.state = {
            username: props.username,
            _id: props._id

>>>>>>> 64ead66a29148bc74871be7e2bb76acedb1599c9

        };
    }

<<<<<<< HEAD
        };
    }

=======
    
>>>>>>> 64ead66a29148bc74871be7e2bb76acedb1599c9
    render() {
        if (!this.state.username) {
            return <Redirect to={{ pathname: "/login" }} />
        } else {
        console.log(this.state.username)
        
<<<<<<< HEAD
        return (
            <div>
            <h1>Welcome</h1>
<form action="/logout" method="POST">
    <button type="submit">Log Out</button>
</form>
           
            <Playlists updateUser={this._id} />
 
  
            </div>
        )
=======
       return(
>>>>>>> 64ead66a29148bc74871be7e2bb76acedb1599c9


        <div>
            <h1>Hello {this.state.username}</h1>
        <Waveform _id={this.state._id}/>
        
        </div>
       )}}
}
export default Profile;
