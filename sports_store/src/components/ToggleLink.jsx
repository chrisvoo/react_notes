import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const ToggleLink = (props) => {
  const { to, exact } = props;

  return (
    <Route
      path={to}
      exact={exact}
      // eslint-disable-next-line react/no-children-prop
      children={(routeProps) => {
        const {
          className,
          activeClass,
          inActiveClass,
          children,
        } = props;

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
};

export default ToggleLink;

ToggleLink.defaultProps = {
  className: null,
  activeClass: null,
  inActiveClass: null,
  exact: false,
};

ToggleLink.propTypes = {
  className: PropTypes.string,
  activeClass: PropTypes.string,
  inActiveClass: PropTypes.string,
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};
