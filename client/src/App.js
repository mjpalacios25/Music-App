import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from "./pages/Profile";
import Search from './components/Search/index';
import Playlists from './components/UserPlaylists/index';




class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      _id: null
  
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
    /*axios.get('/api/users/').then(response => {
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          _id: response.data.user._id
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })*/

    this.setState({
      loggedIn: true,
      username: "mojeezy",
      _id: "5ea8c3eebb48ce2f46ef9806"
    })
  } 

  render() {
  return (
    <HashRouter>
    <div className="container">
    
      <ul>
          <li> <NavLink to='/' id='home' style={{ color: 'white'}}>Home</NavLink></li> <span class="slash"> / </span>
          <li><NavLink to='/profile' style={{ color: 'white'}}> Profile </NavLink></li>
          <div id='logreg'>
          <li> <NavLink to='/login' style={{ color: 'white'}}> Login </NavLink></li> <span class="slash"> / </span>
          <li><NavLink to='/register' style={{ color: 'white'}}> Register </NavLink></li>
          
          </div>
      </ul>
      <div className="content">
        <div className="userNav">
          <span><NavLink to='/search' style={{ color: 'white'}}> Search </NavLink></span> <br />
          <hr className="blink_me2"/>
          <span><NavLink to='/playlists' style={{ color: 'white'}}> Pl<i class="fas fa-headphones-alt blink_me"></i>ylists </NavLink></span>
        </div>
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
              username={this.state.username} _id={this.state._id}
            />} />
      </div>
      <Route path='/search' component={Search} />
      <Route path='/playlists' component={Playlists} />
    </div>
    </HashRouter>
  );
}
}

export default App;
