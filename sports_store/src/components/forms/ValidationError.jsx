import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ValidationError extends Component {
  render() {
    const { errors } = this.props;
    if (errors) {
      return errors.map((err) => (
        <h6 className="text-danger" key={err}>
          { err }
        </h6>
      ));
    }
    return null;
  }
}

ValidationError.defaultProps = {
  errors: null,
};

ValidationError.propTypes = {
  errors: PropTypes.array,
};
