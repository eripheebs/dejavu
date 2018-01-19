import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  toggleBlock = () => {
      this.props.toggleBlock(this.props.username);
  }

  render() {
    return (
      <div className={ this.props.blocked ? "user blocked" : "user"}>
        <div className="username">{this.props.username} </div>
        <div className={'user-admin ' + (this.props.admin ? 'active' : '')}>admin</div>
        <div className={'user-super ' + (this.props.superUser ? 'active' : '')}>super</div>
        <div className="user-logins">{this.props.numberOfLogins ? this.props.numberOfLogins : ''}</div>
        <div className="last-login">{this.props.lastLogin ? this.props.lastLogin : ''}</div>
        <a className="btn btn-default submit-btn" onClick={this.toggleBlock}>
            { this.props.blocked ?
            "Unblock" :
            "Block"
            }
        </a>
      </div>
    );
  }
}

module.exports = User;