import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/loginScreen';
import HomeScreen from './src/screens/homeScreen';

const Stack = createNativeStackNavigator();

    const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
