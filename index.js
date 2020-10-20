/**
 * @format
 */

import { AppRegistry, LogBox, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
LogBox.ignoreLogs(["Warning: Require cycle"]);

AppRegistry.registerComponent(appName, () => App);
