import React, { Component } from 'react';

export default class TodoBanner extends Component {
    render = () => {
      const { name, tasks } = this.props;

      return (
        <h4 className="bg-primary text-white text-center p-2">
            {name}&apos;s To Do List
            ({
              tasks.filter(
                (t) => !t.done &&
                !Object.prototype.hasOwnProperty.call(t, 'newItemText')
              ).length } items to do)
        </h4>
      )
    }
}
