import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user">
          <p>Username: {this.props.username} </p>
          <p>Admin: {this.props.admin}</p>
          <p>Super user: {this.props.superUser}</p>
          <p>Number of Logins: {this.props.numberOfLogins}</p>
      </div>
    );
  }
}

module.exports = User;