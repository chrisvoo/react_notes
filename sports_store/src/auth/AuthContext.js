import React from 'react';

export default React.createContext({
  isAuthenticated: false,
  webToken: null,
  // eslint-disable-next-line no-unused-vars
  authenticate: (username, password) => {},
  signout: () => {},
});
