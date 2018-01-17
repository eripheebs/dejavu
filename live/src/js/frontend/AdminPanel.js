import React, { Component } from 'react';
import { getUsers } from './apiService/getUsers.js';
import User from './User.js';

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        open: false,
        users: []
    }
  }

  showPanel = () => {
      this.getUsers();
  }

  getUsers = () => {
    getUsers(this.props.username, this.handleSuccess, this.handleError, this.props.jwt);
  }

  handleSuccess = (data) => {
    this.setState({
        users: data.users,
        open: !this.state.open });
    console.log(this.state.users);
  }

  handleError = (errorMessage) => {
      console.log(errorMessage);
  }

  mapUsers = () => {
    return this.state.users.map((user) => {
        var superUser = user.superUser ? user.superUser : false;
        var numberOfLogins = user.numberOfLogins ? user.numberOfLogins : false;
        var admin = user.admin ? user.admin : false;
        return <User username={user.username}
                key={user.username}
                admin={admin}
                superUser={superUser}
                numberOfLogins={numberOfLogins}
            />
    });
  }

  render() {
    var users = this.mapUsers();

    return (
        <div>
            {   
                this.props.showPanel ? 
                    <a className="btn btn-default submit-btn" onClick={this.showPanel}>
                        { this.state.open ?
                        "Close Admin Panel" :
                        "Admin Panel"
                        }
                    </a> :
                <div></div>
            }
            {
                this.state.open ?
                <div className="admin-panel">
                     {users}
                </div>
                : <div></div>
            }
        </div>
    );
  }
}

module.exports = AdminPanel;