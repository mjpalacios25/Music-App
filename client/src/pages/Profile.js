
import React, {Component} from 'react'
import { Redirect,Link } from 'react-router-dom'

import Waveform from "../components/Wavesurfer"
import API from "../utils/API"


class Profile extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
            
            _id: props._id,
            loggedIn: props.loggedIn
            
            
        };
        this.logout = this.logout.bind(this)
    }
    
    logout(event) {
        event.preventDefault()
        
        API.logoutUser().then(response => {
          console.log("RESPONSE DATA" + JSON.stringify( response.data.msg))
          if (response.data.msg = "logging out") {
            this.props.updateUser({
                loggedIn:false
            })
            this.setState({
                loggedIn:false
            })
            
            

            }
            
            
          }
        )
        
        .catch(error => {
            console.log('Logout error:' +error) 
            
        })
        
      }

    
    render() {
        
        
        // else if(this.state.loggedOut) {
        //     return <Redirect to={{ pathname: "/" }} />
        // }
        if (this.state.loggedIn){
        console.log(this.state.loggedIn)
        
       return(


        <div>
            <h1>Hello {this.state.username}</h1>
            <button type="submit" className="btn btn-primary userButton" onClick={this.logout}>Logout</button>
        

        <Waveform _id={this.state._id}/>
        
        </div>
       )}
       else{
        
            return <Redirect to={{ pathname: "/login" }} />
        
       }}
       }
export default Profile;
