import React, { Component } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/jsx-props-no-spreading
export const ForwardFormField = React.forwardRef((props, ref) => <FormField {...props} fieldRef={ref} />);

export class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: '',
    };
  }

    handleChange = (ev) => {
      this.setState({ fieldValue: ev.target.value });
    }

    render() {
      const { label, fieldRef } = this.props;
      const { fieldValue } = this.state;
      return (
        <div className="form-group p-2">
          <label htmlFor="testField">
            {`Forwarded ${label}`}
            <input
              id="testField"
              className="form-control"
              value={fieldValue}
              onChange={this.handleChange}
              ref={fieldRef}
            />
          </label>
        </div>
      );
    }
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldRef: PropTypes.object.isRequired,
};
