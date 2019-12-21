import model from './Models';
import ConfigureStore from './ConfigureStore';
import Api from '../Services/Api';

let store = null;
let apiClient = null;

const createStore = () => {
  console.log('LOG_createstore OK');

  apiClient = Api.createApiClient();
  store = ConfigureStore(model, apiClient);
  return store;
};

// StoreCreater - Store Instance

export default createStore;
export {store as StoreService, apiClient as ApiService};
