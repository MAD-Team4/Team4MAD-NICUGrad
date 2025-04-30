import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MedicationPage() {
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'White tablet',
      dosage: '5mg',
      frequency: 'Once daily',
      hours: 24,
      duration: 'For a week',
      lastTaken: null,
      nextDue: null,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('Once daily');
  const [customHours, setCustomHours] = useState('');
  const [newDuration, setNewDuration] = useState('');

  const getHoursFromFrequency = (frequency) => {
    switch (frequency) {
      case 'Once daily': return 24;
      case 'Twice daily': return 12;
      case 'Every 8 hours': return 8;
      case 'Every 6 hours': return 6;
      case 'Custom': return parseInt(customHours) || 24;
      default: return 24;
    }
  };

  const calculateNextDue = (hours) => {
    const next = new Date();
    next.setHours(next.getHours() + hours);
    return next.toLocaleString();
  };

  const addMedication = () => {
    if (!newName || !newDosage || !selectedFrequency || !newDuration) return;
    const hours = getHoursFromFrequency(selectedFrequency);
    const newMed = {
      id: Date.now().toString(),
      name: newName,
      dosage: newDosage,
      frequency: selectedFrequency,
      hours: hours,
      duration: newDuration,
      lastTaken: null,
      nextDue: null,
    };
    setMedications([...medications, newMed]);
    setNewName('');
    setNewDosage('');
    setSelectedFrequency('Once daily');
    setCustomHours('');
    setNewDuration('');
    setModalVisible(false);
  };

  const markAsTaken = (id) => {
    const now = new Date();
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id
          ? {
              ...med,
              lastTaken: now.toLocaleString(),
              nextDue: calculateNextDue(med.hours),
            }
          : med
      )
    );
  };

  const renderMedication = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <MaterialCommunityIcons name="pill" size={24} color="#0984e3" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.medName}>{item.name}</Text>
          <Text style={styles.details}>Dosage: {item.dosage}</Text>
          <Text style={styles.details}>Frequency: {item.frequency}</Text>
          <Text style={styles.details}>Duration: {item.duration}</Text>
          {item.lastTaken && <Text style={styles.details}>Last Taken: {item.lastTaken}</Text>}
          {item.nextDue && <Text style={styles.details}>Next Due: {item.nextDue}</Text>}
        </View>
        <View style={styles.iconActions}>
          <TouchableOpacity onPress={() => markAsTaken(item.id)}>
            <MaterialCommunityIcons
              name={item.lastTaken ? 'check-circle-outline' : 'close-circle-outline'}
              size={24}
              color={item.lastTaken ? '#27ae60' : '#e74c3c'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const frequencyOptions = ['Once daily', 'Twice daily', 'Every 8 hours', 'Every 6 hours', 'Custom'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={renderMedication}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Medication</Text>
          <TextInput style={styles.input} placeholder="Name" value={newName} onChangeText={setNewName} />
          <TextInput style={styles.input} placeholder="Dosage" value={newDosage} onChangeText={setNewDosage} />

          <Text style={styles.label}>Select Frequency:</Text>
          <View style={styles.buttonGroup}>
            {frequencyOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.freqButton,
                  selectedFrequency === option && styles.freqButtonSelected,
                ]}
                onPress={() => setSelectedFrequency(option)}
              >
                <Text style={styles.freqText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedFrequency === 'Custom' && (
            <TextInput
              style={styles.input}
              placeholder="Custom interval in hours (1-24)"
              keyboardType="numeric"
              value={customHours}
              onChangeText={setCustomHours}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Duration"
            value={newDuration}
            onChangeText={setNewDuration}
          />

          <TouchableOpacity style={styles.saveButton} onPress={addMedication}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ marginTop: 20, color: '#0984e3' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fafd',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#0984e3',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#dfe6e9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  medName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  details: {
    fontSize: 14,
    color: '#2d3436',
    marginTop: 2,
  },
  iconActions: {
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0984e3',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0984e3',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#2d3436',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  freqButton: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0984e3',
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
  },
  freqButtonSelected: {
    backgroundColor: '#0984e3',
  },
  freqText: {
    color: '#2d3436',
  },
  saveButton: {
    backgroundColor: '#0984e3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
