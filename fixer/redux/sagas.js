import {all} from 'redux-saga/effects';

import rootSagaService from './service/saga';
import rootSagaAuthentication from './authentication/saga';
import rootSagaOrder from './order/saga';

export default function* root() {
  yield all([...rootSagaService, ...rootSagaAuthentication, ...rootSagaOrder]);
}
