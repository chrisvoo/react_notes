import React, { Component } from 'react';

export default class TodoCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { newItemText: '' }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewTodo = () => {
    const { callback } = this.props;
    const { newItemText } = this.state;

    callback(newItemText);
    this.setState({ newItemText: '' });
  }

  render = () => {
    const { newItemText } = this.state;

    return (
      <div className="my-1">
        <input
          className="form-control"
          value={newItemText}
          onChange={this.updateNewTextValue}
        />
        <button
          type="button"
          className="btn btn-primary mt-1"
          onClick={this.createNewTodo}
        >
          Add
        </button>
      </div>
    );
  }
}
