import React, { Component } from 'react';
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
