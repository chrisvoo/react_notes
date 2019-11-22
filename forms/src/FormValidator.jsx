import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidateData from './ValidationData';
import ValidationContext from './ValidationContext';

export default class FormValidator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      dirty: {},
      formSubmitted: false,
      // eslint-disable-next-line react/no-unused-state
      getMessagesForField: this.getMessagesForField,
    };
  }

  /**
   * invoked right before calling the render method, both on the initial mount
   * and on subsequent updates. It should return an object to update the state,
   * or null to update nothing.
   * @param {object} props contains the form data to be validated and the validation
   * checks that should be applied
   * @param {object} state The state
   */
  static getDerivedStateFromProps(props, state) {
    state.errors = ValidateData(props.data, props.rules);
    if (state.formSubmitted && Object.keys(state.errors).length === 0) {
      const formErrors = props.validateForm(props.data);
      if (formErrors.length > 0) {
        state.errors.form = formErrors;
      }
    }

    return state;
  }

  get formValid() {
    const { errors } = this.state;
    return Object.keys(errors).length === 0;
  }

  getButtonClasses() {
    const { formSubmitted } = this.state;
    return formSubmitted && !this.formValid
      ? 'btn-danger' : 'btn-primary';
  }

  handleChange = (ev) => {
    const { name } = ev.target;
    this.setState((state) => state.dirty[name] = true);
  }

  handleClick = (ev) => {
    const { submit, data, validateForm } = this.props;

    this.setState({ formSubmitted: true }, () => {
      if (this.formValid) {
        const formErrors = validateForm(data);
        if (formErrors.length === 0) {
          submit(data);
        }
      }
    });
  }

  getMessagesForField = (field) => {
    const { formSubmitted, dirty, errors } = this.state;
    return (formSubmitted || dirty[field]) ? (errors[field] || []) : [];
  }

  render() {
    const { children } = this.props;
    const { formSubmitted } = this.state;
    return (
      <>
        <ValidationContext.Provider value={this.state}>
          <div onChange={this.handleChange}>
            { children }
          </div>
        </ValidationContext.Provider>
        <div className="text-center">
          <button
            type="button"
            className={`btn ${this.getButtonClasses()}`}
            onClick={this.handleClick}
            disabled={formSubmitted && !this.formValid}
          >
            Submit
          </button>
        </div>
      </>
    );
  }
}

FormValidator.defaultProps = {
  data: {},
  rules: {},
};

FormValidator.propTypes = {
  children: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  data: PropTypes.object,
  rules: PropTypes.object,
};
