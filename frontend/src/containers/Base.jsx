import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth.jsx';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

const Base = ({ children }) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/">JSMarks</IndexLink>
        </Navbar.Brand>
      </Navbar.Header>
      {Auth.isUserAuthenticated() ? (
        <Nav>
          <NavItem><Link to="/">Bookmarks</Link></NavItem>
          <NavItem><Link to="/user">Users</Link></NavItem>
          <NavItem><Link to="/logout">Logout</Link></NavItem>
        </Nav>
      ) : (
        <Nav>
          <NavItem><Link to="/login">Login</Link></NavItem>
          <NavItem><Link to="/signup">SignUp</Link></NavItem>
        </Nav>
      )}
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
