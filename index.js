/**
 * @format
 */
import 'react-native-gesture-handler';
import {Settings} from 'react-native-fbsdk-next';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if ((Platform.OS = 'ios')) {
  Settings.initializeSDK();
}

AppRegistry.registerComponent(appName, () => App);
