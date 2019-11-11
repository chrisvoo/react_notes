import { ActionTypes, DataTypes } from './Types';
import RestDataSource from './RestDataSource';

const dataSource = new RestDataSource();

export const setPageSize = (newSize) => ({ type: ActionTypes.DATA_SET_PAGESIZE, payload: newSize });

export const setSortProperty = (newProp) => ({ type: ActionTypes.DATA_SET_SORT_PROPERTY, payload: newProp });

export const placeOrder = (order) => ({
  type: ActionTypes.DATA_STORE,
  payload: dataSource.StoreData(DataTypes.ORDERS, order).then((response) => ({
    dataType: DataTypes.ORDERS,
    data: response.data,
  })),
});

/**
 * the only requirement for the objects produced by action creators is they must have a
 * type property whose value specifies the type of change required to the data store.
 */
export const loadData = (dataType, params) => ({
  type: ActionTypes.DATA_LOAD,
  payload: dataSource.GetData(dataType, params).then((response) => ({
    dataType,
    data: response.data,
    total: Number(response.headers['x-total-count']),
    params,
  })), // it provides the data to be added to the data store.
});
