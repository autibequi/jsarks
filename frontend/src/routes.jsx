import Base from './containers/Base.jsx';
import LoginPage from './containers/Login.jsx';
import HomePage from './containers/Home.jsx';
import SignUpPage from './containers/SignUp.jsx';
import Auth from './modules/Auth.jsx';
import UserPage from './containers/User.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, HomePage);
        } else {
          callback(null, LoginPage);
        }
      },
    },

    {
      path: '/bookmarks',
      component: HomePage,
    },

    {
      path: '/login',
      component: LoginPage,
    },

    {
      path: '/user',
      component: UserPage,
    },

    {
      path: '/signup',
      component: SignUpPage,
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/login');
      },
    },
  ],
};

export default routes;
