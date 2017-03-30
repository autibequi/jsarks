/* global document */
// Libs
import React from 'react';
import { Panel, Alert, Form, Button, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import ApiService from '../modules/API.jsx';
import Auth from '../modules/Auth.jsx';

class App extends React.Component {
  getInitialState() {
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    return {
      email: '',
      password: '',
      showAlert: false,
      alertLevel: 'success',
      alertMessage: '',
    };
  }

  handleChange(e) {
    const dict = {};
    dict[e.target.name] = e.target.value;
    this.setState(dict);
  }

  signup(e) {
    e.preventDefault();

    const form = {
      username: this.state.email,
      password: this.state.password,
      admin: false,
    };

    const that = this;
    ApiService.Login(form)
      .then((response) => {
        Auth.authenticateUser(response.data);
        this.context.router.push('/bookmarks');
        that.setState({ alertLevel: 'success', showAlert: false, alertMessage: 'Correct Password, Loging in.' });
      })
      .catch(() => {
        that.setState({ alertLevel: 'warning', showAlert: true, alertMessage: 'Wrong User/Password' });
      });
  }

  render() {
    return (
      <div>
        <h1> Login </h1>
        <Panel collapsible expanded={this.state.showAlert} bsClass="nothing">
          <Alert bsStyle={this.state.alertLevel}>
            {this.state.alertMessage}
          </Alert>
        </Panel>

        <Form horizontal onSubmit={this.signup}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
             Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Username"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
             Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
               Login
             </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
