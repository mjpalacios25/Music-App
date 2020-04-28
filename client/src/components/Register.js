import React, {Component} from 'react';


class Register extends Component {
    render() {
        return (
    <div className="register-div">
     <form >
            <div className="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" aria-describedby="enterUsername" placeholder="Enter username" />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
                <label for="exampleFormControlFile1">Profile Picture</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
            </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
        )
    }
}

export default Register;