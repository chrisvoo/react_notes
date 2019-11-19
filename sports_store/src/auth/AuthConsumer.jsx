/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import AuthContext from './AuthContext';

export default (WrappedComponent) => class extends Component {
    render = () => (
      <AuthContext.Consumer>
        { (context) => <WrappedComponent {...this.props} {...context} /> }
      </AuthContext.Consumer>
    )
};
