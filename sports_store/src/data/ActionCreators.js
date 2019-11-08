import { ActionTypes } from './Types';
import phData from './placeholderData';

/**
 * the only requirement for the objects produced by action creators is they must have a
 * type property whose value specifies the type of change required to the data store.
 */
export default (dataType) => ({
  type: ActionTypes.DATA_LOAD,
  payload: {
    dataType, // it indicates the type of data that the action relates to
    data: phData[dataType], // it provides the data to be added to the data store.
  },
});
