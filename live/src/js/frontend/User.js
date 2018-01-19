import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
        changePassword: false,
        password: null
    }
  }
  
  valChangePassword = (event) => {
      this.setState({ password: event.target.value} );
  }

  toggleBlock = () => {
      this.props.toggleBlock(this.props.username);
  }

  togglePasswordChange = () => {
      this.setState({ changePassword: !this.state.changePassword });
  }

  changePassword = () => {
      this.props.changePassword(this.state.password, this.props.username);
  }

  changeAdmin = () => {
      this.props.changeAdmin(this.props.username);
  }

  changeSuperUser = () => {
      this.props.changeSuperUser(this.props.username);
  }

  render() {
    return (
      <div className={ this.props.blocked ? "user blocked" : "user"}>
        <div className="username">{this.props.username} </div>
        <div className={'user-admin ' + (this.props.admin ? 'active' : '')} onClick={this.changeAdmin}>admin</div>
        <div className={'user-super ' + (this.props.superUser ? 'active' : '')} onClick={this.changeSuperUser}>super</div>
        <div className="user-logins">{this.props.numberOfLogins ? this.props.numberOfLogins : ''}</div>
        <div className="last-login">{this.props.lastLogin ? this.props.lastLogin : ''}</div>
        <a className="btn btn-default submit-btn" onClick={this.toggleBlock}>
            { this.props.blocked ?
            "Unblock" :
            "Block"
            }
        </a>
        <a className="btn btn-default submit-btn" onClick={this.togglePasswordChange}>
            { this.state.changePassword ?
                "Close password change" :
                "Change Password"
            }
        </a>
        { this.state.changePassword ?
            <div className="create-new-user">
                <input type="password" className="form-control" name="password" placeholder="password"
                                            onChange={this.valChangePassword} />
                <a className="btn btn-default submit-btn" onClick={this.changePassword}>
                    Change Password
                </a>
            </div> : <div></div>
        }
      </div>
    );
  }
}

module.exports = User;