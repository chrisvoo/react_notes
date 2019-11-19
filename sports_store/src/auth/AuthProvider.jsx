import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

/**
 * This component uses the React context feature in its render method to provide
 * an implementation of the AuthContext properties and functions.
 */
export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      webToken: null,
    };
  }

  authenticate = (credentials) => {
    if (!process.env.REACT_APP_AUTH_URL) {
      throw new Error('REACT_APP_AUTH_URL env missing');
    }

    return Axios.post(process.env.REACT_APP_AUTH_URL, credentials)
      .then((response) => {
        if (response.data.success === true) {
          this.setState({
            isAuthenticated: true,
            webToken: response.data.token,
          });
          return true;
        }

        throw new Error('Invalid Credentials');
      });
  }

  signout = () => {
    this.setState({ isAuthenticated: false, webToken: null });
  }

  render = () => (
    <AuthContext.Provider value={{
      ...this.state,
      authenticate: this.authenticate,
      signout: this.signout,
    }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      { this.props.children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
