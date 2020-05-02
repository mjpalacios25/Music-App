import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom'
import API from "../utils/API"
import Waveform from "../components/Wavesurfer";
import Playlists from '../components/UserPlaylists'
import SearchSpotify from '../components/Search'

class Profile extends Component {
    constructor(props) {
        super(props);
        // console.log(props.username)
        // console.log(props._id)
        this.state = {
            username: props.username,
            _id: props._id,
            loggedIn: props.loggedIn,
            songLink: "https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86",
            songName: "Demo Song"
            
            
        };
        this.logout = this.logout.bind(this)
    }
    updateSong (profileObject) {
        this.setState(profileObject)
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
        

        <Waveform _id={this.state._id} songLink = {this.state.songLink} songName={this.state.songName}/>
        {/* <Waveform _id={this.state._id}/> <br /> <br /> */}
        
        <Playlists _id={this.state._id} updateSong={this.updateSong} />
        {/* <SearchSpotify _id={this.state._id} /> */}
        
        </div>
       )}
       else{
        
            return <Redirect to={{ pathname: "/login" }} />
        
       }}
       }
export default Profile;
