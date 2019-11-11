import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

export default class ToggleLink extends Component {
  render() {
    const { to, exact } = this.props;

    return (
      <Route
        path={to}
        exact={exact}
        children={(routeProps) => {
          const {
            children,
            className,
            activeClass,
            inActiveClass
          } = this.props;

          const baseClasses = className || 'm-2 btn btn-block';
          const cssActiveClass = activeClass || 'btn-primary';
          const cssInActiveClass = inActiveClass || 'btn-secondary';
          const combinedClasses = `${baseClasses} ${routeProps.match ? cssActiveClass : cssInActiveClass}`;
          return (
            <Link
              to={to}
              className={combinedClasses}
            >
              {children}
            </Link>
          );
        }}
      />
    );
  }
}
