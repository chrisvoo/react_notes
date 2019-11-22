import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationContext from './ValidationContext';

export default class ValidationMessage extends Component {
    // eslint-disable-next-line react/static-property-placement
    static contextType = ValidationContext;

    render() {
      const { field } = this.props;
      return this.context.getMessagesForField(field).map((err) => (
        <div
          className="small bg-danger text-white mt-1 p-1"
          key={err}
        >
          { err }
        </div>
      ));
    }
}

ValidationMessage.propTypes = {
  field: PropTypes.string.isRequired,
};
