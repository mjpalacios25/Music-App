
import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import LogoutButton from "../components/LogoutButton"
import Waveform from "../components/Wavesurfer"

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props.username)
        console.log(props._id)
        this.state = {
            username: props.username,
            _id: props._id,
            updateUser:props.updateUser

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
            <LogoutButton updateUser={this.state.updateUser}/>
        <Waveform _id={this.state._id}/>
        
        </div>
       )}}
}
export default Profile;
