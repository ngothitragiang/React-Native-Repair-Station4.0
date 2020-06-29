import {Navigation} from 'react-native-navigation';

import startApp from './src/navigation/bottomTab';
import {setRoot} from './src/navigation/function';
import firebase from 'react-native-firebase';
import {registerScreens} from './src/navigation/registerScreens';
import {AsyncStorage} from 'react-native';

// import messaging from '@react-native-firebase/messaging';
registerScreens();

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('RemoteMessage handled in background: ', remoteMessage);
// });

Navigation.events().registerAppLaunchedListener(async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setRoot('splashScreen');
  } else {
    setRoot('login');
  }
});
