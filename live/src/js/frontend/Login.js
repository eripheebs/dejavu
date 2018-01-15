import React, { Component } from 'react';

class Login extends Component {

  render() {
    return (
      <div>
        <div className="splashIn">
          <div className="form-group m-0 col-xs-4 pd-0 pr-5">
            <div className="username-container">
              <input type="text" className="form-control" name="username" placeholder="Username"
                onChange={props.valChangeUsername} />
            </div>
          </div>
          <div className="col-xs-8 m-0 pd-0 pr-5 form-group">
            <div className="password-container">
              <input type="password" className="form-control" name="password" placeholder="Password"
                onChange={props.valChangePassword} />
            </div>
          </div>
				</div>
        <div className="submit-btn-container">
          <a className={props.esBtn} onClick={props.logIn}>
            Log In
          </a>
        </div>
      </div>
    );
  }
}

export default Login;