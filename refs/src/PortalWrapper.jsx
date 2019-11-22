import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class PortalWrapper extends Component {
  constructor(props) {
    super(props);
    this.portalElement = document.getElementById('portal');
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(
      <div className="border p-3">{children}</div>,
      this.portalElement,
    );
  }
}

PortalWrapper.defaultProps = {
  children: {},
};

PortalWrapper.propTypes = {
  children: PropTypes.object,
};
