import {Navigation} from 'react-native-navigation';

import startApp from './src/navigation/bottomTab';
import {setRoot} from './src/navigation/function';
import firebase from 'react-native-firebase';
import {registerScreens} from './src/navigation/registerScreens';
import {AsyncStorage} from 'react-native';
import { RemoteMessage } from 'react-native-firebase';

// import messaging from '@react-native-firebase/messaging';
registerScreens();


firebase
.messaging()
.getToken()
.then(fcmToken => {
  if (fcmToken) {
    console.log('sdfsdf',fcmToken );
  }
});
firebase.messaging().onMessage((message: RemoteMessage) => {
  // Process your message as required
  alert('sdf');
});
Navigation.events().registerAppLaunchedListener(async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setRoot('splashScreen');
  } else {
    setRoot('login');
  }
});


