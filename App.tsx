import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store'; 
import loginScreen from './src/screens/loginScreen';
import homeScreen from './src/screens/homeScreen';

const Stack = createNativeStackNavigator();

    const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={loginScreen} />
          <Stack.Screen name="Home" component={homeScreen} />
          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
