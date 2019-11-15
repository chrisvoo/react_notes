import React from 'react';
import PropTypes from 'prop-types';
import ToggleLink from '../components/ToggleLink';

const CategoryNavigation = (props) => {
  const { baseUrl, categories } = props;

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
};

export default CategoryNavigation;

CategoryNavigation.defaultProps = {
  categories: [],
};

CategoryNavigation.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  categories: PropTypes.array,
};
