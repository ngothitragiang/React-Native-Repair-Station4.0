import {Navigation} from 'react-native-navigation';
import SplashScreen from './src/screens/SplashScreen';

import startApp from './fixer/navigation/bottomTab';
import {setRoot} from './fixer/navigation/function';
Navigation.registerComponent('SplashScreen', () => SplashScreen);
import firebase from 'react-native-firebase';
import {registerScreens} from './fixer/navigation/registerScreens';
registerScreens();

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    startApp();
  } else {
    setRoot('login');
  }
});
