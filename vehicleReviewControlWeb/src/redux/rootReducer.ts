import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import serviceOrderReducer from './slices/serviceOrder';
import customerReducer from './slices/customer';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  serviceOrder: serviceOrderReducer,
  customer: customerReducer,
});

export { rootPersistConfig, rootReducer };
