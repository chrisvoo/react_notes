import React, { Component } from 'react';

export default class PaginationButtons extends Component {
    getPageNumbers = () => {
      const { pageCount, currentPage } = this.props;

      if (pageCount < 4) {
        return [...Array(pageCount + 1).keys()].slice(1);
      } if (currentPage <= 4) {
        return [1, 2, 3, 4, 5];
      } if (currentPage > pageCount - 4) {
        return [...Array(5).keys()].reverse()
          .map((v) => pageCount - v);
      }
      return [currentPage - 1, currentPage, currentPage + 1];
    }

    render() {
      const { pageCount, currentPage, navigate } = this.props;
      const current = currentPage;
      return (
        <>
          <button
            type="button"
            onClick={() => navigate(current - 1)}
            disabled={current === 1}
            className="btn btn-secondary mx-1"
          >
                    Previous
          </button>
          { current > 4
              && (
              <>
                <button
                  type="button"
                  className="btn btn-secondary mx-1"
                  onClick={() => navigate(1)}
                >
                  1
                </button>
                <span className="h4">...</span>
              </>
              )}
          { this.getPageNumbers().map((num) => (
            <button
              type="button"
              className={`btn mx-1 ${num === current ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => navigate(num)}
              key={num}
            >
              { num }
            </button>
          ))}
          { current <= (pageCount - 4)
                && (
                <>
                  <span className="h4">...</span>
                  <button
                    type="button"
                    className="btn btn-secondary mx-1"
                    onClick={() => navigate(pageCount)}
                  >
                    { pageCount }
                  </button>
                </>
                )}
          <button
            type="button"
            onClick={() => navigate(current + 1)}
            disabled={current === pageCount}
            className="btn btn-secondary mx-1"
          >
            Next
          </button>
        </>
      );
    }
}
