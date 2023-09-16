import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { completeTask, cancelTask } from '../redux/actions/taskActions';
import { createRandomTask } from '../redux/actions/taskActions'

// Sidebar component
const Sidebar = (idn) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.sidebar}>
      <Button style={styles.sidebarButton}
        title="View Completed Tasks"
        onPress={() => {
          // Navigate to a screen to view completed tasks
        }}
      />
      <Button style={styles.sidebarButton}
        title="View All Completed Tasks"
        onPress={() => {
          // Navigate to a screen to view all completed tasks
        }}
      />
      <Button style={styles.sidebarButton}
        title="Leaderboard"
        onPress={() => {
          // Navigate to a screen to view the leaderboard
        }}      />
      <Button style={styles.sidebarButton}
        title="Cancel Current Task"
        onPress={() => dispatch(cancelTask(idn))}
      />
    </View>
  );
};

// Task component
const Task = ({ currentTask, idn }) => {
  const dispatch = useDispatch();

  if (currentTask) {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{currentTask.productName}</Text>
        <Text style={styles.taskText}>{currentTask.productAmount} units</Text>
        <Text style={styles.taskText}>Deliver to: {currentTask.institution}</Text>
        <Button title="Complete Task" onPress={() => dispatch(completeTask(idn))} />
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
  console.log("currentTask antes do dispatch", currentTask);
  console.log("idn antes do dispatch", idn.idn);

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
      <Button style={styles.generateButton} title="Generate Random Task" onPress={generateRandomTask} />
    </>
  );
};

const HomeScreen = ({ route, navigation }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const idn = route.params.idn;

  // Access Redux state using useSelector
  const currentTask = useSelector(state => state.task.currentTask);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
        style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>☰</Text>
      </TouchableOpacity>

      {isSidebarOpen ? <Sidebar idn={idn}/> : null}

      <View style={styles.mainContent}>
        {currentTask ? <Task currentTask={currentTask} idn={idn} /> : <Welcome idn={idn} />}
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
    marginBottom: 8,
    backgroundColor: '#ccc',
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
    marginBottom: 16,
  },
});

export default HomeScreen;
