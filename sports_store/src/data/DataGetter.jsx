import React, { Component } from 'react';
import { DataTypes } from './Types';

export default class DataGetter extends Component {
    componentDidUpdate = () => this.getData();

    componentDidMount = () => this.getData();

    getData = () => {
      const {
        products_params: productParams,
        pageSize = 5,
        sortKey = 'name',
        match: { params },
        loadData,
      } = this.props;
      const dsData = productParams || {};
      const rtData = {
        _limit: pageSize,
        _sort: sortKey,
        _page: params.page || 1,
        category_like: (params.category || '') === 'all' ? '' : params.category,
      };

      if (Object.keys(rtData).find((key) => dsData[key] !== rtData[key])) {
        loadData(DataTypes.PRODUCTS, rtData);
      }
    }

    render() {
      return <>{this.props.children}</>;
    }
}
