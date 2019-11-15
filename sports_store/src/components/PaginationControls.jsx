import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginationButtons from './PaginationButtons';

export default class PaginationControls extends Component {
  constructor(props) {
    super(props);

    const { sizes, keys } = this.props;
    this.pageSizes = sizes || [5, 10, 25, 100];
    this.sortKeys = keys || ['Name', 'Price'];
  }

    handlePageSizeChange = (ev) => {
      const { setPageSize } = this.props;
      setPageSize(ev.target.value);
    }

    handleSortPropertyChange = (ev) => {
      const { setSortProperty } = this.props;
      setSortProperty(ev.target.value);
    }

    render() {
      const {
        currentPage, pageCount, navigateToPage, pageSize, sortKey,
      } = this.props;
      return (
        <div className="m-2">
          <div className="text-center m-1">
            <PaginationButtons
              currentPage={currentPage}
              pageCount={pageCount}
              navigate={navigateToPage}
            />
          </div>
          <div className="form-inline justify-content-center">
            <select
              className="form-control"
              onChange={this.handlePageSizeChange}
              value={pageSize || this.pageSizes[0]}
            >
              { this.pageSizes.map((s) => (
                <option value={s} key={s}>
                  {`${s} per page`}
                </option>
              ))}
            </select>
            <select
              className="form-control"
              onChange={this.handleSortPropertyChange}
              value={sortKey || this.sortKeys[0]}
            >
              { this.sortKeys.map((k) => (
                <option value={k.toLowerCase()} key={k}>
                  {`Sort By ${k}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
}

PaginationControls.defaultProps = {
  currentPage: 0,
  pageCount: 0,
  pageSize: null,
  sortKey: null,
  sizes: null,
  keys: null,
};

PaginationControls.propTypes = {
  setPageSize: PropTypes.func.isRequired,
  setSortProperty: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  navigateToPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  sortKey: PropTypes.string,
  sizes: PropTypes.array,
  keys: PropTypes.array,
};
