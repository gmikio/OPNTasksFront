/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const Main = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Main);
