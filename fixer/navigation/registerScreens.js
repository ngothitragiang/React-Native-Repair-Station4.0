import {Navigation} from 'react-native-navigation';
import React from 'react';
import store from '../redux/store';
import {Provider} from 'react-redux';
import homeFixer from '../screens/home/home';
import serviceFixer from '../screens/services/services';
import FormService from '../screens/services/formService';
import showNotification from '../components/notifications/showNotification';
import serviceSetting from '../screens/services/serviceSetting';
import login from '../screens/authentication/login';
import register from '../screens/authentication/register';
import profileUser from '../screens/authentication/profileUser';
import order from '../screens/order/order';
import orderDetail from '../screens/order/orderDetail';
import alertConfirm from '../components/alertConfirm';
console.disableYellowBox = true;

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export function registerScreens() {
  Navigation.registerComponent(
    'homeFixer',
    () => ReduxProvider(homeFixer),
    () => homeFixer,
  );

  Navigation.registerComponent(
    'serviceFixer',
    () => ReduxProvider(serviceFixer),
    () => serviceFixer,
  );

  Navigation.registerComponent(
    'FormService',
    () => ReduxProvider(FormService),
    () => FormService,
  );

  Navigation.registerComponent(
    'serviceSetting',
    () => ReduxProvider(serviceSetting),
    () => serviceSetting,
  );

  Navigation.registerComponent(
    'showNotification',
    () => ReduxProvider(showNotification),
    () => showNotification,
  );
  Navigation.registerComponent(
    'login',
    () => ReduxProvider(login),
    () => login,
  );
  Navigation.registerComponent(
    'register',
    () => ReduxProvider(register),
    () => register,
  );
  Navigation.registerComponent(
    'profileUser',
    () => ReduxProvider(profileUser),
    () => profileUser,
  );

  Navigation.registerComponent(
    'order',
    () => ReduxProvider(order),
    () => order,
  );

  Navigation.registerComponent(
    'orderDetail',
    () => ReduxProvider(orderDetail),
    () => orderDetail,
  );
  Navigation.registerComponent(
    'alertConfirm',
    () => ReduxProvider(alertConfirm),
    () => alertConfirm,
  );
}
