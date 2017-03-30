/* global localStorage */
class Auth {

  static authenticateUser(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('isAdmin', token.isAdmin);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAdmin() {
    return localStorage.getItem('isAdmin');
  }

}

export default Auth;
