/* global document */
// Libs
import React from 'react';
import { Table, Form, Col, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import ApiService from '../modules/API.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
  }

  getInitialState() {
    return {
      bookmarks: [],
      title: '',
      url: '',
    };
  }

  componentDidMount() {
    ApiService.GetBookmarks()
    .then((data) => {
      let bookmarks = [];
      if (data.data.length > 0) {
        bookmarks = data.data;
      }
      this.setState({
        bookmarks,
        title: '',
        url: '',
      });
    });
  }

  handleChange(e) {
    const dict = {};
    dict[e.target.name] = e.target.value;
    this.setState(dict);
  }

  addBookmark() {
    const form = {
      title: this.state.title,
      url: this.state.url,
    };

    ApiService.AddBookmark(form)
      .then((response) => {
        debugger;
      })
      .catch((a) => {
        debugger;
      });
  }

  deleteBookmark(e) {
    ApiService.DeleteBookmark(e.target.value)
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
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
             TITLE
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="title"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
             URL
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                name="url"
                placeholder="url"
                onChange={this.handleChange}
                value={this.state.url}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.addBookmark}>
               ADD BOOKMARK
             </Button>
            </Col>
          </FormGroup>
        </Form>

        <Table responsive>
          <thead>
            <tr>
              <th>URL</th>
              <th>LINK</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bookmarks.map(bookmark => (
              <tr>
                <td>{bookmark.title}</td>
                <td>{bookmark.url}</td>
                <td><Button value={bookmark._id} onClick={this.deleteBookmark}>Deletar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
