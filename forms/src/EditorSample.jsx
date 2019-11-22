import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bob',
      flavor: 'Vanilla',
      toppings: ['Strawberries'],
      twoScoops: false,
    };

    this.flavors = ['Chocolate', 'Double Chocolate',
      'Triple Chocolate', 'Vanilla'];
    this.toppings = ['Sprinkles', 'Fudge Sauce',
      'Strawberries', 'Maple Syrup'];
  }

  // input, radio, textarea
  updateFormValue = (event) => {
    const { submit } = this.props;
    this.setState({ [event.target.name]: event.target.value },
      () => submit(this.state));
  }

  // select
  updateFormValueOptions = (event) => {
    const { submit } = this.props;
    const options = [...event.target.options]
      .filter((o) => o.selected).map((o) => o.value);
    this.setState({ [event.target.name]: options },
      () => submit(this.state));
  }

  // checkbox
  updateFormValueCheck = (event) => {
    const { submit } = this.props;
    this.setState({ [event.target.name]: event.target.checked },
      () => submit(this.state));
  }

  render() {
    const {
      name, flavor, toppings, twoScoops, order,
    } = this.state;

    return (
      <div className="h5 bg-info text-white p-2">
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
        </div>
        <div className="form-group">
          <label htmlFor="flavor">Ice Cream Flavors
            <select
              id="flavor"
              className="form-control"
              name="flavor"
              value={flavor}
              onChange={this.updateFormValue}
            >
              { this.flavors.map((f) => (
                <option value={f} key={f}>
                  { f }
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="toppings">Ice Cream Toppings
            <select
              id="toppings"
              className="form-control"
              multiple
              name="toppings"
              value={toppings}
              onChange={this.updateFormValueOptions}
            >
              { this.toppings.map((top) => (
                <option value={top} key={top}>
                  { top }
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <div className="form-check">
            <label htmlFor="twoScoops" className="form-check-label">
              Two Scoops
              <input
                id="twoScoops"
                className="form-check-input"
                type="checkbox"
                name="twoScoops"
                checked={twoScoops}
                onChange={this.updateFormValueCheck}
              />
            </label>
          </div>
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
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  submit: PropTypes.func.isRequired,
};
