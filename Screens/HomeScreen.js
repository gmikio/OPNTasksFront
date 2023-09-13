/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Adicione um estado para controlar o carregamento
  const [error, setError] = useState('');
  const route = useRoute();
  const idn = route.params.idn;

  const generateRandomTask = async () => {
    try {
      // Inicie o indicador de carregamento
      setIsLoading(true);

      const response = await fetch(
        `http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/CreateRandomTask?idn=${idn}`,
        {
          method: 'GET',
        },
      );
      console.log(response);
      if (response.ok) {
        const taskInfo = await response.json();
        setCurrentTask({
          productName: taskInfo.product.name,
          productAmount: taskInfo.amount,
          instituition: taskInfo.instituition.name,
        }); // Atualiza o estado com a tarefa gerada
        setIsLoading(false); // Pare o indicador de carregamento
      } else {
        setError('Erro ao gerar a tarefa');
        setIsLoading(false); // Pare o indicador de carregamento
      }
    } catch (e) {
      console.error('Error:', e);
      setError('Erro na conexão com o servidor');
      setIsLoading(false); // Pare o indicador de carregamento em caso de erro
    }
    // const randomTask = {
    //   product: 'Product Name',
    //   quantity: 5,
    //   institution: 'Institution X',
    // };

    // setCurrentTask(randomTask);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
        style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>☰</Text>
      </TouchableOpacity>

      {isSidebarOpen && (
        <View style={styles.sidebar}>
          {/* Sidebar Buttons */}
          <Button
            title="View Completed Tasks"
            onPress={() => {
              // Navigate to a screen to view completed tasks
            }}
            style={styles.sidebarButton}
          />
          <Button
            title="View All Completed Tasks"
            onPress={() => {
              // Navigate to a screen to view all completed tasks
            }}
            style={styles.sidebarButton}
          />
          <Button
            title="Leaderboard"
            onPress={() => {
              // Navigate to a screen to view the leaderboard
            }}
            style={styles.sidebarButton}
          />
          <Button
            title="Cancel Current Task"
            onPress={cancelTask}
            style={styles.sidebarButton}
          />
        </View>
      )}

      <View style={styles.mainContent}>
        {/* Main Content */}
        {currentTask ? (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{currentTask.product}</Text>
            <Text style={styles.taskText}>{currentTask.quantity} units</Text>
            <Text style={styles.taskText}>
              Deliver to: {currentTask.institution}
            </Text>
            <Button title="Complete Task" onPress={completeTask} />
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Bem vindo ao OPN Tasks!!</Text>
            <Button
              title="Generate Random Task"
              onPress={generateRandomTask}
              style={styles.generateButton}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 15,
    justifyContent: 'flex-start', // Start from the top
  },
  mainContent: {
    flex: 2,
    padding: 16,
  },
  heading: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  sidebarButton: {
    marginBottom: 8, // Add margin between buttons
    backgroundColor: '#ccc', // Change the background color
  },
  sidebarButtonText: {
    fontSize: 24,
  },
  taskContainer: {
    alignItems: 'center',
  },
  taskText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
  },
  generateButton: {
    marginBottom: 16, // Add margin to the Generate Random Task button
  },
});

export default HomeScreen;
