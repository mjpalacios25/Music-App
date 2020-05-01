import React from "react";

export function Nav()  {
    return (
        <div className = "navbar navbar-expand-lg navbar-dark bg-primary" >
            <ul>
          <li> <NavLink to='/' id='home' style={{ color: 'white'}}>Home</NavLink></li>
          <div id='logreg'>
          <li> <NavLink to='/login' style={{ color: 'white'}}> Login </NavLink></li> <span id="slash"> / </span>
          <li><NavLink to='/register' style={{ color: 'white'}}> Register </NavLink></li>
          <li><NavLink to='/profile' style={{ color: 'white'}}> Profile </NavLink></li>
          </div>
      </ul>
        </div>
    )
};

