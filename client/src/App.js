import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';



class App extends Component {
  render() {
  return (
    <HashRouter>
    <div className="container">
    
      <ul>
          <li> <NavLink to='/' id='home' style={{ color: 'white'}}>Home</NavLink></li>
          <div id='logreg'>
          <li> <NavLink to='/login' style={{ color: 'white'}}> Login </NavLink></li> <span id="slash"> / </span>
          <li><NavLink to='/register' style={{ color: 'white'}}> Register </NavLink></li>
          </div>
      </ul>
      <div className="content">
      <Route path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />     
      </div>
    </div>
    </HashRouter>
  );
}
}

export default App;
