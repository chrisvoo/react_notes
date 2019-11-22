import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormValidator from './FormValidator';
import ValidationMessage from './ValidationMessage';
import ValidateForm from './wholeFormValidation';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      emailConfirm: '',
      order: '',
      terms: false,
    };
    this.rules = {
      name: { required: true, minlength: 3, alpha: true },
      email: { required: true, email: true, equals: 'emailConfirm' },
      emailConfirm: { required: true, email: true, equals: 'email' },
      order: { required: true },
      terms: { true: true },
    };
  }

    updateFormValue = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    updateFormValueCheck = (event) => {
      this.setState({ [event.target.name]: event.target.checked });
    }

    render() {
      const {
        name, email, order, terms, emailConfirm,
      } = this.state;
      const { submit } = this.props;

      return (
        <div className="h5 bg-info text-white p-2">
          <FormValidator
            data={this.state}
            rules={this.rules}
            submit={submit}
            validateForm={ValidateForm}
          >
            <ValidationMessage field="form" />
            <div className="form-group">
              <label htmlFor="name">Name
                <input
                  id="name"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={this.updateFormValue}
                />
              </label>
              <ValidationMessage field="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email
                <input
                  id="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={this.updateFormValue}
                />
              </label>
              <ValidationMessage field="email" />
            </div>
            <div className="form-group">
              <label htmlFor="emailConfirm">Email confirm
                <input
                  id="emailConfirm"
                  className="form-control"
                  name="emailConfirm"
                  value={emailConfirm}
                  onChange={this.updateFormValue}
                />
              </label>
              <ValidationMessage field="emailConfirm" />
            </div>
            <div className="form-group">
              <label htmlFor="order">Order
                <textarea
                  id="order"
                  className="form-control"
                  name="order"
                  value={order}
                  onChange={this.updateFormValue}
                />
              </label>
              <ValidationMessage field="order" />
            </div>
            <div className="form-group">
              <div className="form-check">
                <label htmlFor="terms" className="form-check-label">
                  <input
                    id="terms"
                    className="form-check-input"
                    type="checkbox"
                    name="terms"
                    checked={terms}
                    onChange={this.updateFormValueCheck}
                  />
                    Agree to terms
                </label>
              </div>
              <ValidationMessage field="terms" />
            </div>
          </FormValidator>
        </div>
      );
    }
}

Editor.propTypes = {
  submit: PropTypes.func.isRequired,
};
