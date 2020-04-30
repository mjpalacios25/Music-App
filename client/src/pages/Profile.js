import React, { Component } from 'react';
import Playlists from '../components/UserPlaylists'



// import Waveform from "../components/Wavesurfer"
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.updateUser.username,
            _id: props.updateUser._id


        };
    }

    render() {
        
        return (
            <div>
            <h1>Welcome</h1>
<form action="/logout" method="POST">
    <button type="submit">Log Out</button>
</form>
           
            <Playlists updateUser={this._id} />
 
  
            </div>
        )

    }
}

export default Profile
