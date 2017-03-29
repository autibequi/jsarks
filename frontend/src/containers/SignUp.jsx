/* global document */
// Libs
import React from 'react';
import FormData from 'form-data';
import { Form, Button, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import ApiService from '../modules/API.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(e) {
    const dict = {};
    dict[e.target.name] = e.target.value;
    this.setState(dict);
  }

  signup(e) {
    const form = {
      username: this.state.email,
      password: this.state.password,
      admin: true,
    };

    ApiService.SignUp(form)
      .then((a) => {
        debugger;
      })
      .catch((a) => {
        debugger;
      });
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
           Email
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              placeholder="Email"
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
            <Button onClick={this.signup}>
             Sign up
           </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default App;
