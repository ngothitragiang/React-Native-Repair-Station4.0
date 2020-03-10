import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as orderAction from './actions/actions';
import store from '../store';
import firebase from 'react-native-firebase';
import {eventChannel} from 'redux-saga';
import {showNotification} from '../../navigation/function';
import {getDataRequest, setDataRequest} from '../../api/database';
function* getAllOrder() {
  const channel = new eventChannel(data => {
    let listener = getDataRequest('orders/', data);
    // #2: Return the shutdown method;
    return () => {
      listener.off();
    };
  });
  while (true) {
    const {data} = yield take(channel);
    let keys = Object.keys(data);
    let listOrder = keys.map(function(k) {
      data[k].id = k;
      return data[k];
    });
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put(orderAction.getAllOrderSuccess([...listOrder]));
  }
}

function* addServiceToOrder(actions) {
  try {
    let response = yield call(
      setDataRequest,
      'orders/' + actions.orderId + '/services/',
      actions.data,
    );
    yield put(orderAction.addServiceToOrderSuccess());
  } catch (error) {
    console.log('error add service', error);
    yield showNotification(
      'showNotification',
      'Thêm dịch vụ không thành công',
      'error',
    );

    yield put(orderAction.addServiceToOrderFailed(error));
  }
}

const rootSagaOrder = () => [
  takeLatest(typesAction.GET_ALL_ORDER, getAllOrder),
  takeLatest(typesAction.ADD_SERVICE_TO_ORDER, addServiceToOrder),
];
export default rootSagaOrder();
