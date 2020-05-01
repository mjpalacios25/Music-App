import React, {Component} from 'react';
import API from "../utils/API";

class Register extends Component {
    constructor() {
		super()
		this.state = {
			username: '',
			password: '',
            confirmPassword: '',
           

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
		console.log('sign-up handleSubmit, username: ')
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
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" aria-describedby="enterUsername" placeholder="Enter username" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
            {/* <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Profile Picture</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
            </div> */}

                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Sign up</button>
        </form>
    </div>
        )
    }
}

export default Register;