import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataTypes } from './Types';

const DataGetter = (props) => {
  const {
    products_params: productParams,
    pageSize,
    sortKey,
    match: { params: { category, page } },
    loadData,
    children,
  } = props;

  // componentDidMount, componentDidUpdate
  useEffect(() => {
    const rtData = {
      _limit: pageSize,
      _sort: sortKey,
      _page: page || 1,
      category_like: (category || '') === 'all' ? '' : category,
    };

    if (Object.keys(rtData).find((key) => productParams[key] !== rtData[key])) {
      loadData(DataTypes.PRODUCTS, rtData);
    }
  });

  return <>{children}</>;
};

export default DataGetter;

DataGetter.defaultProps = {
  products_params: {},
  pageSize: 5,
  sortKey: 'name',
};

DataGetter.propTypes = {
  products_params: PropTypes.object,
  pageSize: PropTypes.number,
  sortKey: PropTypes.string,
  match: PropTypes.object.isRequired,
  loadData: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
