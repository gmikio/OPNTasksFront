/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './redux/store'; 


const Main = () => {
  return ( 
        <Provider store={store}>
            <App />
        </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
AppRegistry.runApplication(appName, {
  // Mount the react-native app in the "root" div of index.html
  rootTag: document.getElementById("root"),
});