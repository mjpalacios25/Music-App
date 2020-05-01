import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import API from "../../utils/API"

class LogoutButton extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
        this.state = {
            loggedIn : true
        }
        
    }

    logout(event) {
        event.preventDefault()
        API.logoutUser().then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.state.loggedIn = false;
          }
        })
        .then( <Redirect to={{ pathname: "/" }}/>)
        .catch(error => {
            console.log('Logout error:' +error) 
            return <Redirect to={{ pathname: "/" }}/>
        })
        return <Redirect to={{pathname: "/"}}/>        
      }

    render() {
        if (!this.state.loggedIn) {
            return <Redirect to={{ pathname: "/" }} />
        } else {
        return (
            <div>
                                <Link to="/" className="btn btn-primary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>

                            </div>
        )}}
        }
    


export default LogoutButton;