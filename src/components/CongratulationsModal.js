// CongratulationsModal.js
import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

const CongratulationsModal = ({ visible, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Parabéns! VAI NATAL!!</Text>
        <Button title="Bora pra mais uma" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    marginHorizontal: '30%',
    marginVertical: '60%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CongratulationsModal;