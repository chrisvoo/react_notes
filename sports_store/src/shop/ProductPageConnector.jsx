import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setPageSize, setSortProperty } from '../data/ActionCreators';

const mapStateToProps = (dataStore) => dataStore;
const mapDispatchToProps = { setPageSize, setSortProperty };
const mergeProps = (dataStore, actionCreators, router) => ({
  ...dataStore,
  ...router,
  ...actionCreators,
  currentPage: Number(router.match.params.page),
  pageCount: Math.ceil((dataStore.products_total | dataStore.pageSize || 5) / (dataStore.pageSize || 5)),
  navigateToPage: (page) => router.history
    .push(`/shop/products/${router.match.params.category}/${page}`),
});

/**
 * This is a HOC which combines data store properties, action creators, and route parameters to
 * provide the pagination control components with access to the features they require.
 */
export default (PageComponent) => withRouter(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageComponent),
);
