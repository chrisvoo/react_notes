import Axios from 'axios';

export default class RestDataSource {
  GetEndpoint = (dataType) => {
    let endpoint;

    switch (dataType) {
      case 'products':
        endpoint = process.env.REACT_APP_PRODUCTS_ENDPOINT;
        break;
      case 'categories':
        endpoint = process.env.REACT_APP_CATEGORIES_ENDPOINT;
        break;
      case 'orders':
        endpoint = process.env.REACT_APP_ORDERS_ENDPOINT;
        break;
      default:
        throw new Error(`Unknown datatype ${dataType}`);
    }

    return endpoint;
  }

  GetData = (dataType, params) => this.SendRequest('get', this.GetEndpoint(dataType), params);

  StoreData = (dataType, data) => this.SendRequest('post', this.GetEndpoint(dataType), {}, data);

  SendRequest = (method, url, params, data) => Axios.request({
    method, url, params, data,
  });
}
