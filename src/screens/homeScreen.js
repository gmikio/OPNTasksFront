import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { completeTask, cancelTask } from '../redux/actions/taskActions';

// Sidebar component
const Sidebar = () => {
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
        <Text style={styles.taskText}>{currentTask.product}</Text>
        <Text style={styles.taskText}>{currentTask.quantity} units</Text>
        <Text style={styles.taskText}>Deliver to: {currentTask.institution}</Text>
        <Button title="Complete Task" onPress={() => dispatch(completeTask(idn))} />
      </View>
    );
  } else {
    return null;
  }
};

// Welcome component
const Welcome = () => {
  return (
    <>
      <Text style={styles.heading}>Bem vindo ao OPN Tasks!!</Text>
      <Button style={styles.generateButton}
        title="Generate Random Task"
        onPress={() => {
          // Dispatch an action to create a random task
        }}
      />
    </>
  );
};

const homeScreen = ({ navigation }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const route = useRoute();
  const idn = route.params.idn;

  // Access Redux state using useSelector
  const currentTask = useSelector(state => state.tasks.currentTask);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
        style={styles.sidebarButton}>
        <Text style={styles.sidebarButtonText}>☰</Text>
      </TouchableOpacity>

      {isSidebarOpen ? <Sidebar /> : null}

      <View style={styles.mainContent}>
        {currentTask ? <Task currentTask={currentTask} idn={idn} /> : <Welcome />}
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

export default homeScreen;
