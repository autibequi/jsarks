/* global document */
// Libs
import React from 'react';
import { Table, Form, Col, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import ApiService from '../modules/API.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addBookmark = this.deleteUser.bind(this);
  }

  getInitialState() {
    return {
      users: [],
    };
  }

  componentDidMount() {
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
    ApiService.DeleteUser(e.target.value)
      .then((response) => {
        debugger;
      })
      .catch((a) => {
        debugger;
      });
  }

  render() {
    return (
      <div>
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
                <td>{user.username}</td>
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
