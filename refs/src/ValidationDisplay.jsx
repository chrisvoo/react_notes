import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ValidationDisplay extends Component {
  render() {
    const { errors } = this.props;
    return (
      errors
        ? errors.map((err) => (
          <div className="small bg-danger text-white mt-1 p-1" key={err}>
            { err }
          </div>
        ))
        : null
    );
  }
}

ValidationDisplay.defaultProps = {
  errors: [],
};

ValidationDisplay.propTypes = {
  errors: PropTypes.array,
};
