import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleLink from '../components/ToggleLink';

export default class CategoryNavigation extends Component {
  render() {
    const { baseUrl, categories } = this.props;

    return (
      <>
        <ToggleLink to={`${baseUrl}/all`} exact={false}>All</ToggleLink>
        {categories && categories.map((cat) => (
          <ToggleLink
            key={cat}
            to={`${baseUrl}/${cat.toLowerCase()}`}
          >
            { cat }
          </ToggleLink>
        ))}
      </>
    );
  }
}

CategoryNavigation.defaultProps = {
  categories: [],
};

CategoryNavigation.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  categories: PropTypes.array,
};
