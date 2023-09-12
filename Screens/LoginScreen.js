import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [inputIDN, setInputIDN] = useState('');
  const [inputUserName, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Adicione um estado para controlar o carregamento
  const navigation = useNavigation();

  const handleIDNInputChange = (text) => {
    setInputIDN(text);
  };
  const handleUserNameInputChange = (text) => {
    setUsername(text);
  };

  const handleLogin = async () => {
    try {
      // Inicie o indicador de carregamento
      setIsLoading(true);

      const response = await fetch('http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idn: inputIDN, userName: inputUserName }),
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUsername(userInfo.name);
        setError('');

        // Aguarde 1 segundo antes de redirecionar para a tela Home
        setTimeout(() => {
          setIsLoading(false); // Pare o indicador de carregamento
          navigation.navigate('Home',{ animationType: 'Stacking', idn: inputIDN}); // Redirecione para a tela Home
        }, 1000);
      } else {
        setUsername('');
        setError('IDN não encontrado');
        setIsLoading(false); // Pare o indicador de carregamento
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Erro na conexão com o servidor');
      setIsLoading(false); // Pare o indicador de carregamento em caso de erro
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/arts/logoMaior.png')}
        style={styles.logo}
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

      {/* Desativar o botão enquanto estiver carregando */}
      <Button title="Login" onPress={handleLogin} disabled={isLoading} />

      {/* Display User IDN */}
      {inputUserName && <Text style={[styles.userIdn, { color: 'black' }]}>Seu nome: {inputUserName}</Text>}

      {/* Display Error Message */}
      {error && <Text style={[styles.error, { color: 'red' }]}>{error}</Text>}
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
    color: "black",
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
  color: "black",
    userIdn: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen