
import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

import Waveform from "../components/Wavesurfer"
class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props.username)
        console.log(props._id)
        this.state = {
            username: props.username,
            _id: props._id


        };
    }

    
    render() {
        if (!this.state.username) {
            return <Redirect to={{ pathname: "/login" }} />
        } else {
        console.log(this.state.username)
        
       return(


        <div>
            <h1>Hello {this.state.username}</h1>
        <Waveform _id={this.state._id}/>
        
        </div>
       )}}
}
export default Profile;
