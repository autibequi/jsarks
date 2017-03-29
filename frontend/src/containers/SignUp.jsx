/* global document */
// Libs
import React from 'react';
import { Panel, Alert, Form, Button, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import ApiService from '../modules/API.jsx';

class App extends React.Component {
  getInitialState() {
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    return {
      email: '',
      password: '',
      showAlert: false,
      alertLevel: '',
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
      admin: true,
    };
    const that = this;
    ApiService.SignUp(form)
      .then(() => {
        that.setState({ alertLevel: 'success', showAlert: true, alertMessage: 'User Created' });
      })
      .catch(() => {
        that.setState({ alertLevel: 'warning', showAlert: true, alertMessage: 'Login Already Exists' });
      });
  }

  render() {
    return (
      <div>
        <Panel collapsible expanded={this.state.showAlert} bsClass>
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
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                required
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
                required
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" >
               Sign up
             </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
