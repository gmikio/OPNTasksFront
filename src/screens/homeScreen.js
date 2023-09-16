import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { completeTask, cancelTask } from '../redux/actions/taskActions';
import { createRandomTask } from '../redux/actions/taskActions'
import CongratulationsModal from '../components/CongratulationsModal';
import Sidebar from '../components/Sidebar';

// Task component
const Task = ({ currentTask, idn }) => {

  if (currentTask) {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Leve: {currentTask.productName}</Text>
        <Text style={styles.taskText}>{currentTask.productAmount} unidades</Text>
        <Text style={styles.taskText}>para: {currentTask.institution}</Text>
      </View>
    );
  } else {
    return null;
  }
};

// Welcome component
const Welcome = (idn) => {
  const dispatch = useDispatch();
  const currentTask = useSelector(state => state.task.currentTask);

  const generateRandomTask = () => {

    // Dispatch the action and handle it when it's fulfilled
    dispatch(createRandomTask(idn))
        .then((resultAction) => {
        if (resultAction.payload !== null) {
            console.log("Received task data:", resultAction.payload);
        } else {
            console.log("Received null payload. Check your API response.");
        }

        console.log("currentTask depois do dispatch", currentTask);
        })
        .catch((error) => {
        console.error("Error dispatching createRandomTask:", error);
            });
    };

  return (
    <>
      <Text style={styles.heading}>Bem vindo ao OPN Tasks!!</Text>
      <Button style={styles.generateButton} title="Gerar nova tarefa" onPress={generateRandomTask} />
    </>
  );
};

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCongratulationsVisible, setIsCongratulationsVisible] = useState(false); // Manage modal visibility
  const idn = route.params.idn;

  // Access Redux state using useSelector
  const currentTask = useSelector(state => state.task.currentTask);

  const handleCompleteTask = (idn) => {
    // Dispatch the completeTask action here
    dispatch(completeTask(idn))
      .then(resultAction => {
        if (resultAction.payload === null) {
            console.log("resultAction.payload === null")
            setIsCongratulationsVisible(true); // Show the modal on success
        } else {
          console.log('Received non-null payload. Handle it if needed.');
        }
      })
      .catch(error => {
        console.error('Error dispatching completeTask:', error);
      });
  };

  const handleCloseCongratulations = () => {
    setIsCongratulationsVisible(false); // Close the modal
    // Dispatch an action to reset the currentTask here if needed
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
        style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>☰</Text>
      </TouchableOpacity>

      {isSidebarOpen ? <Sidebar idn={idn} /> : null}

      <View style={styles.mainContent}>
        {currentTask ? <Task currentTask={currentTask} idn={idn} /> : <Welcome idn={idn} />}
        {currentTask ? 
            <Button title="Completei a tarefa :)" onPress={() => handleCompleteTask(idn)} /> :
            null}
        {/* <Button title="Complete Task" onPress={handleCompleteTask} /> */}
        <CongratulationsModal visible={isCongratulationsVisible} onClose={handleCloseCongratulations} />
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
    justifyContent: 'flex-start',
  },
  sidebarButton: {
    backgroundColor: '#ccc',
  },
  sidebarButtonText: {
    fontSize: 24,
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
   taskContainer: {
    alignItems: 'center',
  },
  taskText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
  },
  generateButton: {
    marginBottom: 16,
  },
});

export default HomeScreen;
