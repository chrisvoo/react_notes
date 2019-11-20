import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  webToken: null,
  // eslint-disable-next-line no-unused-vars
  authenticate: (username, password) => {},
  signout: () => {},
});

export default AuthContext;
