import axios from 'axios';
import ENV from '../config.jsx';
import Auth from './Auth.jsx';

const URL = require('url');

export default {
  SignUp: formData =>
    axios.post(URL.resolve(ENV.API_ENDPOINT, 'user'), formData),
  Login: formData =>
    axios.post(URL.resolve(ENV.API_ENDPOINT, 'login'), formData),
  GetBookmarks: () => {
    const token = Auth.getToken();
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(URL.resolve(ENV.API_ENDPOINT, 'bookmark'), headers);
  },
  AddBookmark: (formData) => {
    const token = Auth.getToken();
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    return axios.post(URL.resolve(ENV.API_ENDPOINT, 'bookmark'), formData, headers);
  },
  DeleteBookmark: (id) => {
    const token = Auth.getToken();
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    return axios.delete(URL.resolve(ENV.API_ENDPOINT, `bookmark/${id}`), headers);
  },
  GetUser: () => {
    const token = Auth.getToken();
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    return axios.get(URL.resolve(ENV.API_ENDPOINT, 'user'), headers);
  },
  DeleteUser: (id) => {
    const token = Auth.getToken();
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    return axios.delete(URL.resolve(ENV.API_ENDPOINT, `user/${id}`), headers);
  },
};
