/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationDisplay from './ValidationDisplay';
import GetValidationMessages from './ValidationMessages';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    /* To set the value, use the defaultValue or defaultChecked attribute, but bear
     * in mind that the value you specify will be used only when the element is first
     * rendered and won’t update the element when it is changed.
        this.nameRef = React.createRef(); or through a callback function
        this.categoryRef = React.createRef();
        this.priceRef = React.createRef();  */

    /* Form elements have built-in validation support through the HTML Constraint Validation API,
     * which can be accessed using refs. */
    this.formElements = {
      name: { label: 'Name', name: 'name', validation: { required: true, minLength: 3 } },
      category: { label: 'Category', name: 'category', validation: { required: true, minLength: 5 } },
      price: { label: 'Price', name: 'price', validation: { type: 'number', required: true, min: 5 } },
    };

    this.state = {
      errors: {},
    };
  }

  /**
   * It's called between the render and componentDidUpdate methods in the update phase.
   * This getSnapshotBeforeUpdate method allows a component to inspect its current content and
   * generate a custom snapshot object before the render method is called. Once the update is complete, the
   * componentDidUpdate method is called and provided with the snapshot object so that the component can
   * modify the elements that are now in the DOM.
   * A snapshot doesn’t help preserve context if the component is unmounted and re-created, which
   * can happen when an ancestor’s content changes. In these situations, the componentWillUnmount method can
   * be used to access refs, and the data can be preserved via a context */
  getSnapshotBeforeUpdate(props, state) {
    return Object.values(this.formElements).map((item) => ({ name: [item.name], value: item.element.value }));
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    snapshot.forEach((item) => {
      const { element } = this.formElements[item.name];
      if (element.value !== item.value) {
        element.value = item.value;
      }
    });
  }

  handleAdd = () => {
    const { callback } = this.props;
    if (this.validateFormElements()) {
      const data = {};
      Object.values(this.formElements)
        .forEach((v) => {
          data[v.element.name] = v.element.value;
          // eslint-disable-next-line no-param-reassign
          v.element.value = '';
        });
      callback(data);
      this.formElements.name.element.focus();
    }
  }

  validateFormElement = (name) => {
    const errors = GetValidationMessages(this.formElements[name].element);
    this.setState((state) => state.errors[name] = errors);
    return errors.length === 0;
  }

  validateFormElements = () => {
    let valid = true;
    Object.keys(this.formElements).forEach((name) => {
      if (!this.validateFormElement(name)) {
        valid = false;
      }
    });
    return valid;
  }

  setElement = (element) => {
    if (element !== null) { // null when unmounted
      this.formElements[element.name].element = element;
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <>
        {
          Object.values(this.formElements).map((elem) => (
            <div className="form-group p-2" key={elem.name}>
              <label htmlFor={elem.name}>
                {elem.label}
                <input
                  className="form-control"
                  id={elem.name}
                  name={elem.name}
                  autoFocus={elem.name === 'name'}
                  onChange={() => this.validateFormElement(elem.name)}
                  ref={this.setElement}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...elem.validation}
                />
                <ValidationDisplay errors={errors[elem.name]} />
              </label>
            </div>
          ))
        }
        <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={this.handleAdd}>
            Add
          </button>
        </div>
      </>
    );
  }
}

Editor.propTypes = {
  callback: PropTypes.func.isRequired,
};
