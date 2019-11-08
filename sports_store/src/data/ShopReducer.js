import { ActionTypes } from './Types';

/**
 * Actions are processed by data store reducers, which are functions that receive the current
 * contents of the data store and an action object and use them to make changes.
 * Reducers are required to create and return new objects that incorporate any required changes.
 * If the action type isn’t recognized, the reducer must return the data store object it received
 * unchanged.
 */
export default (storeData, action) => {
  switch (action.type) {
    case ActionTypes.DATA_LOAD:
      /* it creates a new object with all the properties of the
       * old store plus the new data received in the action */
      return {
        ...storeData,
        [action.payload.dataType]: action.payload.data,
      };
    default:
      return storeData || {};
  }
};
