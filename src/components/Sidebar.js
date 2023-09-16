import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { cancelTask } from '../redux/actions/taskActions';

const Sidebar = ({ idn }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => {
          // Navigate to a screen to view completed tasks
        }}
      >
        <Text style={styles.sidebarButtonText}>Ver as minhas tarefas completadas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => {
          // Navigate to a screen to view all completed tasks
        }}
      >
        <Text style={styles.sidebarButtonText}>Ver todas as tarefas completadas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => {
          // Navigate to a screen to view the leaderboard
        }}
      >
        <Text style={styles.sidebarButtonText}>Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => dispatch(cancelTask(idn))}
      >
        <Text style={styles.sidebarButtonText}>Cancelar a Task atual</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex:1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    borderRadius: 10, // Rounded corners
  },
  sidebarButton: {
    marginBottom: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5, // Rounded corners
    padding: 10,
  },
  sidebarButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Sidebar;