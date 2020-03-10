import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as authenticationAction from './actions/actions';
import {showNotification} from '../../navigation/function';
import {
  loginRequest,
  logOutRequest,
  registerRequest,
} from '../../api/authentication';
import {setDataRequest} from '../../api/database';
import {eventChannel} from 'redux-saga';

import {getDataRequest} from '../../api/database';

function* login(actions) {
  try {
    const response = yield call(loginRequest, actions.data);

    yield put(authenticationAction.loginSuccess(response));
  } catch (error) {
    console.log('error saga', error);
    yield showNotification(
      'showNotification',
      'Không thể đăng nhập! \n' + error,
      'error',
    );

    yield put(authenticationAction.loginFailed(error));
  }
}

function* logOut(actions) {
  try {
    const response = yield call(logOutRequest);
    yield put(authenticationAction.logOutSuccess());
  } catch (error) {
    console.log('error', error);
    yield put(authenticationAction.logOutFailed());
  }
}

function* register(actions) {
  try {
    const response = yield call(registerRequest, actions.data);

    yield put(authenticationAction.registerSuccess(response));
  } catch (error) {
    console.log('error', error);
    yield showNotification('showNotification', error + '', 'error');
    yield put(authenticationAction.registerFailed(error));
  }
}

function* getStation(actions) {
  const channel = new eventChannel(data => {
    let listener = getDataRequest('stations/', data);
    // #2: Return the shutdown method;
    return () => {
      listener.off();
    };
  });
  while (true) {
    const {data} = yield take(channel);
    let keys = Object.keys(data);
    let stations = keys.map(function(k) {
      data[k].id = k;
      return data[k];
    });
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put(authenticationAction.getStationSuccess([...stations]));
  }
}
function* changePower(actions) {
  const response = yield call(
    setDataRequest,
    'stations/' + actions.stationKey + '/status',
    actions.status,
  );
}

const rootSagaAuthentication = () => [
  takeLatest(typesAction.LOGIN, login),
  takeLatest(typesAction.LOGOUT, logOut),
  takeLatest(typesAction.REGISTER, register),
  takeLatest(typesAction.GET_STATION, getStation),
  takeLatest(typesAction.CHANGE_POWER, changePower),
];
export default rootSagaAuthentication();
