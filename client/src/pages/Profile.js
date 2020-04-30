import React, {Component} from 'react'

import Waveform from "../components/Wavesurfer"
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.updateUser.username

        };
    }

    
    render() {
       return(

        <div>
            <h1>Hello {this.state.username}</h1>
        <Waveform />
        
        </div>
       )}
}
export default Profile;
