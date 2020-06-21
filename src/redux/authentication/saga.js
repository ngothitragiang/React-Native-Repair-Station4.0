import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as authenticationAction from './actions/actions';
import {
  showNotification,
  setRoot,
  showModalNavigation,
} from '../../navigation/function';
import {
  registerApi,
  loginApi,
  updateApi,
  getMyAccountApi,
} from '../../api/auth';

import {
  setDataRequest,
  getAllDataRequest,
  getDataByIdRequest,
  addDataRequest,
} from '../../api/firebase/database';
import {eventChannel} from 'redux-saga';
import {Navigation} from 'react-native-navigation';
import {AsyncStorage} from 'react-native';

function* login(actions) {
  try {
    const response = yield call(loginApi, actions.userData);
    yield put(authenticationAction.loginSuccess());
    yield AsyncStorage.setItem('token', response.data);
    yield call(updateApi, {deviceToken: actions.tokenDevice}, response.data);
  } catch (error) {
    console.log('error saga', error.data);
    yield showNotification('showNotification', error.data, 'error');
    yield put(authenticationAction.loginFailed(error.data));
  }
}
function* getAllStation(actions) {
  const channel = new eventChannel(data => {
    let listener = getAllDataRequest('stations/', data);
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
    yield put(authenticationAction.getAllStationSuccess([...stations]));
  }
}

function* logOut(actions) {
  try {
    yield AsyncStorage.clear();
    yield put(authenticationAction.logOutSuccess());
    yield setRoot('login');
  } catch (error) {
    console.log('error', error);
    yield put(authenticationAction.logOutFailed());
  }
}

function* register(actions) {
  try {
    const response = yield call(registerApi, actions.data);
    yield showNotification(
      'showNotification',
      'Đăng kí thành công, Tiến hành đăng kí thông tin cửa hàng',
      'success',
    );
    yield AsyncStorage.setItem('token', response.data);
    yield showModalNavigation('registerStation');
    yield Navigation.dismissModal(actions.componentId);
  } catch (error) {
    console.log('error', error.data);
    yield showNotification(
      'showNotification',
      'Đăng kí không thành công!',
      'error',
    );
    yield put(authenticationAction.registerFailed(error.data));
  }
}

function* getMyAccount(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    let response = yield call(getMyAccountApi, token);
    console.log('response 2222', JSON.stringify(response.data, null, 4));
    yield put(authenticationAction.getMyAccountSuccess(response.data));
  } catch (error) {
    console.log('error', error);
    yield put(authenticationAction.getMyAccountFailed(error));
  }
}


const rootSagaAuthentication = () => [
  takeLatest(typesAction.LOGIN, login),
  takeLatest(typesAction.GET_ALL_STATION, getAllStation),
  takeLatest(typesAction.LOGOUT, logOut),
  takeLatest(typesAction.REGISTER, register),
  takeLatest(typesAction.GET_MY_ACCOUNT, getMyAccount),
];
export default rootSagaAuthentication();
