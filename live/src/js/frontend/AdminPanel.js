import React, { Component } from 'react';
import { getUsers } from './apiService/getUsers.js';
import User from './User.js';
import { signUp } from './apiService/authHelpers/register.js';
import { toggleBlock } from './apiService/authHelpers/toggleBlock.js';
import { changePassword } from './apiService/authHelpers/changePassword.js';
import { changeAdmin } from './apiService/authHelpers/changeAdmin.js';
import { changeSuperUser } from './apiService/authHelpers/changeSuperUser.js';

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        open: false,
        users: [],
        creatingNewUser: false,
        username: '',
        password: '',
        admin: false,
        superUser: false
    }
  }

  showPanel = () => {
      this.getUsers();
      this.setState({ open: !this.state.open })
  }

  getUsers = () => {
    getUsers(this.props.username, this.handleSuccess, this.handleError, this.props.jwt);
  }

  handleSuccess = (data) => {
    this.setState({
        users: data.users });
  }

  showCreateNewUser = () => {
    this.setState({
        creatingNewUser: !this.state.creatingNewUser });
  }

  handleError = (errorMessage) => {
      alert(errorMessage);
  }
  
  valChangePassword = (event) => {
      this.setState({ password: event.target.value} );
  }

  valChangeUsername = (event) => {
      this.setState({ username: event.target.value });
  }

  createNewUser = () => {
      if (this.state.username != '', this.state.password != '') {
        signUp(this.state.username, this.state.password, this.state.admin, this.state.superUser, this.handleRegister, this.handleError, this.props.jwt);
      }
      else {
          alert('Username and password cannot be left blank');
      }
  }

  handleRegister = () => {
    this.setState({ creatingNewUser: false });
    this.getUsers();
  }

  toggleSuperUser = () => {
      this.setState({ superUser: !this.state.superUser });
  }

  toggleAdmin = () => {
      this.setState({ admin: !this.state.admin });
  }

  toggleBlock = (username) => {
    if (username == 'admin1') {
        alert('You cannot block the main administrator.');
    } else {
      toggleBlock(username, this.handleRegister, this.handleError, this.props.jwt);
    }
  }

  changePassword = (password, username) => {
    changePassword(password, username, this.handleRegister, this.handleError, this.props.jwt)
  }

  changeAdmin = (username) => {
    if (username == 'admin1') {
        alert('You cannot change the administrator rights of the main administrator.');
    } else {
        changeAdmin(username, this.handleRegister, this.handleError, this.props.jwt);
    }
  }

  changeSuperUser = (username) => {
      changeSuperUser(username, this.handleRegister, this.handleError, this.props.jwt);
  }

  mapUsers = () => {
    return this.state.users.map((user) => {
        var superUser = user.superUser ? user.superUser : false;
        var numberOfLogins = user.numberOfLogins ? user.numberOfLogins : false;
        var admin = user.admin ? user.admin : false;
        var lastLogin = user.lastLogin ? user.lastLogin : false;
        var blocked = user.blocked ? user.blocked : false;
        return <User username={user.username}
                key={user.username}
                admin={admin}
                superUser={superUser}
                numberOfLogins={numberOfLogins}
                lastLogin={lastLogin}
                blocked={blocked}
                toggleBlock={this.toggleBlock}
                changePassword={this.changePassword}
                changeAdmin={this.changeAdmin}
                changeSuperUser={this.changeSuperUser}
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
                    <a className="btn btn-default submit-btn" onClick={this.showCreateNewUser}>
                        { this.state.creatingNewUser ?
                        "Close new user creation" :
                        "Create new user"
                        }
                    </a>
                    { this.state.creatingNewUser ?
                        <div className="create-new-user">
                            <input type="text" className="form-control" name="username" placeholder="username"
                                            onChange={this.valChangeUsername} />
                            <input type="password" className="form-control" name="password" placeholder="password"
                                            onChange={this.valChangePassword} />
                            <a className={this.state.admin ? "btn btn-success submit-btn" : "btn btn-warning submit-btn"} onClick={this.toggleAdmin}>
                                Admin
                            </a>
                            <a className={this.state.superUser ? "btn btn-success submit-btn" : "btn btn-warning submit-btn"} onClick={this.toggleSuperUser}>
                                Super User
                            </a>
                            <a className="btn btn-default submit-btn" onClick={this.createNewUser}>
                                Create new user
                            </a>
                        </div>
                        : <div></div>
                    }
                    {users}
                </div>
                : <div></div>
            }
        </div>
    );
  }
}

module.exports = AdminPanel;