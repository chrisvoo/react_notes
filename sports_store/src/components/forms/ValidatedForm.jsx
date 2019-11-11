import React, { Component } from 'react';
import { ValidationError } from './ValidationError';
import { GetMessages } from './ValidationMessages';

/**
 * React supports two ways to use form elements: controlled and uncontrolled. For a controlled element,
 * React manages the element’s content and responds to its change events. The select elements used for
 * configuring pagination fall into this category.
 * Uncontrolled elements are not closely managed by React and rely more on the browser’s functionality.
 * The key to using uncontrolled for elements is a feature called refs, which allow a React component
 * to keep track of the HTML elements that are produced by its render method after they have been displayed
 * to the user. The advantage of using refs is that I can validate the form using the HTML5 validation API.
 * The validation API requires direct access to the form elements, which wouldn’t be possible without the use
 * of refs.
 */
export default class ValidatedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: {},
    };
    this.formElements = {};
  }

  handleSubmit = () => {
    this.setState((state) => {
      const newState = { ...state, validationErrors: {} };
      Object.values(this.formElements).forEach((elem) => {
        if (!elem.checkValidity()) {
          newState.validationErrors[elem.name] = GetMessages(elem);
        }
      });
      return newState;
    }, () => {
      if (Object.keys(this.state.validationErrors).length === 0) {
        const data = Object.assign(...Object.entries(this.formElements)
          .map((e) => ({ [e[0]]: e[1].value })));
        this.props.submitCallback(data);
      }
    });
  }

  registerRef = (element) => {
    if (element !== null) {
      this.formElements[element.name] = element;
    }
  }

  renderElement = (modelItem) => {
    const name = modelItem.name || modelItem.label.toLowerCase();
    return (
      <div className="form-group" key={modelItem.label}>
        <label>{ modelItem.label }</label>
        <ValidationError errors={this.state.validationErrors[name]} />
        <input
          className="form-control"
          name={name}
          ref={this.registerRef}
          {...this.props.defaultAttrs}
          {...modelItem.attrs}
        />
      </div>
    );
  }

  render() {
    return (
      <>
        { this.props.formModel.map((m) => this.renderElement(m))}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-secondary m-1"
            onClick={this.props.cancelCallback}
          >
            { this.props.cancelText || 'Cancel' }
          </button>
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={this.handleSubmit}
          >
            { this.props.submitText || 'Submit'}
          </button>
        </div>
      </>
    );
  }
}
