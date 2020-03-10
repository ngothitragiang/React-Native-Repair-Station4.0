import {combineReducers} from 'redux';

import ServiceReducers from './service/reducer';
import AuthenticationReducers from './authentication/reducer';
import OrderReducers from './order/reducer';
const rootReducer = combineReducers({
  ServiceReducers,
  AuthenticationReducers,
  OrderReducers,
});
export default rootReducer;
