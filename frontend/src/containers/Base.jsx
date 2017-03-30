import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth.jsx';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

const NavItems = () => {
  if (Auth.isAdmin() === 'true') {
    return (
      <Nav>
        <NavItem><Link to="/">Bookmarks</Link></NavItem>
        <NavItem><Link to="/user">Users</Link></NavItem>
        <NavItem><Link to="/logout">Logout</Link></NavItem>
      </Nav>);
  } else if (Auth.isUserAuthenticated()) {
    return (
      <Nav>
        <NavItem><Link to="/">Bookmarks</Link></NavItem>
        <NavItem><Link to="/logout">Logout</Link></NavItem>
      </Nav>);
  }
  return (
    <Nav>
      <NavItem><Link to="/login">Login</Link></NavItem>
      <NavItem><Link to="/signup">SignUp</Link></NavItem>
    </Nav>);
};

const Base = ({ children }) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/">JSMarks</IndexLink>
        </Navbar.Brand>
      </Navbar.Header>
      {NavItems()}
    </Navbar>
    <Grid>
      {children}
    </Grid>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Base;
