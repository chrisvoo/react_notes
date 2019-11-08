import React, { Component } from 'react';
import TodoBanner from './components/TodoBanner';
import TodoRow from './components/TodoRow';
import TodoCreator from './components/TodoCreator';
import VisibilityControl from './components/VisibilityControl';

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
      showCompleted: true,
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

  todoTableRows = (doneValue) => {
    const { todoItems } = this.state;

    return todoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));
  }

  createNewTodo = (task) => {
    const { todoItems } = this.state;

    if (!todoItems.find((item) => item.action === task)) {
      this.setState({
        todoItems: [...todoItems, { action: task, done: false }],
      }, () => localStorage.setItem('todos', JSON.stringify(this.state)));
    }
  }

  /**
   * invoked early in the component’s life and provides a good opportunity
   * to perform tasks such as loading data.
   */
  componentDidMount = () => {
    const data = localStorage.getItem('todos');
    this.setState(data != null
      ? JSON.parse(data)
      : {
        userName: 'Adam',
        todoItems: [
          { action: 'Buy Flowers', done: false },
          { action: 'Get Shoes', done: false },
          { action: 'Collect Tickets', done: true },
          { action: 'Call Joe', done: false }],
        showCompleted: true,
      });
  }

  render() {
    const { userName, todoItems, showCompleted } = this.state;

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
            <tbody>{ this.todoTableRows(false) }</tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl
              description="Completed Tasks"
              isChecked={showCompleted}
              callback={(checked) => this.setState({ showCompleted: checked })}
            />
          </div>
          { showCompleted && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>{ this.todoTableRows(true) }</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
