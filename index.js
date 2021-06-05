/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigation/AppNavigation';
import {name as appName} from './app.json';
import {makeServer} from './src/mirageServer/server';
if (process.env.NODE_ENV === 'development') {
  makeServer({environment: 'development'});
}

AppRegistry.registerComponent(appName, () => App);
