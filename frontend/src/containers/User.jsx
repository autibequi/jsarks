/* global document */
// Libs
import React from 'react';
import { Panel, Alert, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ApiService from '../modules/API.jsx';

class App extends React.Component {
  getInitialState() {
    this.deleteUser = this.deleteUser.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    return {
      users: [],
      showAlert: false,
      alertLevel: 'success',
      alertMessage: '',
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers() {
    ApiService.GetUser()
      .then((data) => {
        let users = [];
        if (data.data.length > 0) {
          users = data.data;
        }
        this.setState({
          users,
        });
      });
  }

  deleteUser(e) {
    const that = this;
    ApiService.DeleteUser(e.target.value)
      .then(() => {
        that.loadUsers();
        that.setState({ alertLevel: 'success', showAlert: false, alertMessage: 'Correct Password, Loging in.' });
      })
      .catch(() => {
        that.setState({ alertLevel: 'warning', showAlert: true, alertMessage: 'Wrong User/Password' });
      });
  }

  render() {
    return (
      <div>
        <Panel collapsible expanded={this.state.showAlert} bsClass="nothing">
          <Alert bsStyle={this.state.alertLevel}>
            {this.state.alertMessage}
          </Alert>
        </Panel>
        <Table responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr>
                <td><Link to={"/user/" + user._id + "/bookmarks"}>{user.username}</Link></td>
                <td><Button value={user._id} onClick={this.deleteUser}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
