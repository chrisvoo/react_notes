import React, { Component } from 'react';
import TodoBanner from './components/TodoBanner';
import TodoRow from './components/TodoRow';
import TodoCreator from './components/TodoCreator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Adam',
      todoItems: [
        { action: 'Buy Flowers', done: false },
        { action: 'Get Shoes', done: false },
        { action: 'Collect Tickets', done: true },
        { action: 'Call Joe', done: false },
      ],
    };

    // Can be avoided using babel-eslint parser and fat arrow functions
    // this.updateNewTextValue = this.updateNewTextValue.bind(this);
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  toggleTodo = (todo) => {
    const { todoItems } = this.state;

    this.setState({
      todoItems: todoItems.map(
        (item) => (
          item.action === todo.action ? { ...item, done: !item.done } : item
        ),
      ),
    });
  }

  todoTableRows = () => {
    const { todoItems } = this.state;

    return todoItems
      .filter((item) => !Object.prototype.hasOwnProperty.call(item, 'newItemText'))
      .map((item) => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));
  }

  createNewTodo = (task) => {
    const { todoItems } = this.state;

    if (!todoItems.find((item) => item.action === task)) {
      this.setState({
        todoItems: [...todoItems, { action: task, done: false }],
      });
    }
  }

  render() {
    const { userName, todoItems } = this.state;

    return (
      <div>
        <TodoBanner name={userName} tasks={todoItems} />
        <div className="container-fluid">
          <TodoCreator callback={this.createNewTodo} />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{ this.todoTableRows() }</tbody>
          </table>
        </div>
      </div>
    );
  }
}
