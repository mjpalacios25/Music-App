import React, {Component} from 'react';
import axios from "axios";
import {Route, NavLink, HashRouter} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from "./pages/Profile";




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
    axios.get('/api/users/').then(response => {
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
    <HashRouter>
    <div className="container">
    
      <ul>
          <li> <NavLink to='/' id='home' style={{ color: 'white'}}>Home</NavLink></li>
          <div id='logreg'>
          <li> <NavLink to='/login' style={{ color: 'white'}}> Login </NavLink></li> <span id="slash"> / </span>
          <li><NavLink to='/register' style={{ color: 'white'}}> Register </NavLink></li>
          <li><NavLink to='/profile' style={{ color: 'white'}}> Profile </NavLink></li>
          </div>
      </ul>
      <div className="content">
      <Route path='/' component={Home} />
      <Route path='/login'
        render={() =>
            <Login
              updateUser={this.updateUser}
            />} />
      <Route path='/register' component={Register} />
      <Route path='/profile'
        render={() =>
            <Profile
              updateUser={this.updateUser}
            />} />
      </div>
    </div>
    </HashRouter>
  );
}
}

export default App;
