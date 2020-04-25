import React, {Component} from 'react';


class Login extends Component {
    render() {
        return (
            <div>
            <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="text" class="form-control" aria-describedby="enterUsername" placeholder="Enter username" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

export default Login;
