import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Register from './pages/Register'
import Login from './pages/Login'
// import Navbar from './components/navbar'
import Profile from './pages/Profile'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
   
        {/* Routes to different components */}
        <Route exact path="/" render={() =>
            <Login
              updateUser={this.updateUser}
            />} />
        <Route exact path="/profile"
          render={() =>
            <Profile
              updateUser={this.updateUser}
            />}
        />
        <Route path="/register" 
          render={() => <Register/>} />

      </div>
    );
  }
}

export default App;
