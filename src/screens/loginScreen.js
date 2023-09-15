import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { loginUser } from '../redux/actions/authActions'; // Import the loginUser action

const loginScreen = () => {
  const [inputIDN, setInputIDN] = useState(null);
  const [inputUserName, setInputUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function
  const error = useSelector(state => state.auth.error); // Get error from Redux state
  const navigation = useNavigation();

  const handleIDNInputChange = text => {
    setInputIDN(text);
  };

  const handleUserNameInputChange = text => {
    setInputUserName(text);
  };

  const handleLogin = () => {
    setIsLoading(true);
    // Dispatch the loginUser action with the input values
    dispatch(loginUser(inputIDN, inputUserName))
      .then(() => {
        setIsLoading(false);
        navigation.navigate('Home', {
          animationType: 'Stacking',
          idn: inputIDN,
        });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/arts/logoMaior.png')}
        resizeMode="contain"
      />
      <TextInput
        style={[styles.input]}
        placeholder="Digite o seu IDN"
        placeholderTextColor="black"
        onChangeText={handleIDNInputChange}
        value={inputIDN}
      />
      <TextInput
        style={[styles.input]}
        placeholder="Digite o seu Nome"
        placeholderTextColor="black"
        onChangeText={handleUserNameInputChange}
        value={inputUserName}
      />

      {/* Disable the button while loading */}
      <Button title="Login" onPress={handleLogin} disabled={isLoading} />

      {/* Display Error Message */}
      {error ? (<Text style={[styles.error, { color: 'red' }]}>{error}</Text>
        ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    color: 'black',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#111111',
    borderRadius: 5,
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '10%',
    marginBottom: 100,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default loginScreen;
