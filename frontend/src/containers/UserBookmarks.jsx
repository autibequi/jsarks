/* global document */
// Libs
import React from 'react';
import { Panel, Alert, Table, Form, Col, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import ApiService from '../modules/API.jsx';

class App extends React.Component {
  getInitialState() {
    this.handleChange = this.handleChange.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.updateBookmarks = this.updateBookmarks.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    return {
      bookmarks: [],
      title: '',
      url: '',
      showAlert: false,
      alertLevel: 'success',
      alertMessage: '',
      userID: this.props.params.id,
    };
  }

  componentDidMount() {
    this.updateBookmarks();
  }

  updateBookmarks() {
    ApiService.GetUserBookmarks(this.state.userID)
      .then((data) => {
        let bookmarks = [];
        if (data.data.length > 0) {
          bookmarks = data.data;
        }
        this.setState({
          bookmarks,
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
    const that = this;
    ApiService.AddBookmark(form)
      .then(() => {
        that.updateBookmarks();
        that.setState({ alertLevel: 'success', showAlert: true, alertMessage: 'Bookmark correctly added.' });
      })
      .catch(() => {
        that.setState({ alertLevel: 'warning', showAlert: true, alertMessage: 'Bad Url.' });
      });
  }

  deleteBookmark(e) {
    const that = this;
    ApiService.DeleteBookmark(e.target.value)
      .then(() => {
        that.updateBookmarks();
        that.setState({ alertLevel: 'success', showAlert: true, alertMessage: 'Bookmark correctly deleted.' });
      })
      .catch(() => {
        that.setState({ alertLevel: 'warning', showAlert: true, alertMessage: 'Something Went Wrong. Reload this page.' });
      });
  }

  render() {
    return (
      <div>
        <h1> User's Bookmark List </h1>
        <Panel collapsible expanded={this.state.showAlert} bsClass="nothing">
          <Alert bsStyle={this.state.alertLevel}>
            {this.state.alertMessage}
          </Alert>
        </Panel>

        <Table responsive>
          <thead>
            <tr>
              <th>URL</th>
              <th>LINK</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bookmarks.map(bookmark => (
              <tr>
                <td>{bookmark.title}</td>
                <td>{bookmark.url}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
