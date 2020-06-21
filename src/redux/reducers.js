import {combineReducers} from 'redux';

import ServiceReducers from './service/reducer';
import AuthenticationReducers from './authentication/reducer';
import BookReducers from './book/reducer';
import StationReducers from './station/reducer';
const rootReducer = combineReducers({
  ServiceReducers,
  AuthenticationReducers,
  BookReducers,
  StationReducers,
});
export default rootReducer;
