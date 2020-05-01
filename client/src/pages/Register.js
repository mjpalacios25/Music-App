import React, {Component} from 'react';
import API from "../utils/API";

class Register extends Component {
    constructor() {
		super()
		this.state = {
			username: '',
			password: '',
           // confirmPassword: '',
           

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
		console.log('sign-up handleSubmit, username: ' )
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
        API.registerUser({
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
    }
    
    render() {
        return (
	<div className="register-div">
	 <form >
            <div className="form-group">
			<label htmlFor="exampleInputEmail1" className="entryLabel">Username</label>
                <input type="text" className="form-control" aria-describedby="enterUsername" placeholder="Enter username" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="entryLabel">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
                    <button type="submit" className="btn btn-primary userButton" onClick={this.handleSubmit}>Sign up</button>
        </form>
    </div>
        )
    }
}

export default Register;