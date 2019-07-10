import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDDAb-WZehGc3sruOiHG7le05BZdIWVKtc',
  authDomain: 'react-slack-8a8cf.firebaseapp.com',
  databaseURL: 'https://react-slack-8a8cf.firebaseio.com',
  projectId: 'react-slack-8a8cf',
  storageBucket: 'react-slack-8a8cf.appspot.com',
  messagingSenderId: '661166599635',
  appId: '1:661166599635:web:24d47c3d5fc3758e'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
