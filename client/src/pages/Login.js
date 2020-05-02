import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

import API from "../utils/API"
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            _id: "",
            redirectTo: null,
            invalid: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        API.loginUser({
            username: this.state.username,
            password: this.state.password
        }).then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        _id: response.data._id
                    })
                    // update the state to redirect to profile
                    this.setState({
                        invalid: false,
                        redirectTo: '/profile'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                this.setState({
                    invalid: true
                })
                
            })
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
        return (
        
            <div className="register-div">
            <form>
            <h1>Login</h1>
            {this.state.invalid && <p className="slash">Username or password incorrect</p>}
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="entryLabel">Username</label>
                <input type="text" className="form-control" aria-describedby="enterUsername" placeholder="Enter username" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="entryLabel">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </div>

                    <button type="submit" className="btn btn-primary userButton" onClick={this.handleSubmit}>Login</button>
            </form>
            </div>
        )
    }}
}

export default Login;
