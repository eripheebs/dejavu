import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="logIn">
        <div className="spashIn">
          <div className="form-group m-0 col-xs-6 pd-0 pr-5">
            <div className="username-container">
              <input type="text" className="form-control" name="username" placeholder="Username"
                onChange={this.props.valChangeUsername} />
            </div>
          </div>
          <div className="col-xs-6 m-0 pd-0 pr-5 form-group">
            <div className="password-container">
              <input type="password" className="form-control" name="password" placeholder="Password"
                onChange={this.props.valChangePassword} />
            </div>
          </div>
				</div>
        <div className="submit-btn-container loginContainer">
          <a className="btn btn-default submit-btn" onClick={this.props.logIn}>
            Log In
          </a>
        </div>
      </div>
    );
  }
}

module.exports = Login;