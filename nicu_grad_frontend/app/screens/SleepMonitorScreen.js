// nicu_grad_frontend/app/screens/SleepMonitorScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../constants/API';

const SleepMonitorScreen = () => {
    const [hoursSlept, setHoursSlept] = useState('');
    const [minutesSlept, setMinutesSlept] = useState('');    
    const [quality, setQuality] = useState('');
    const [entries, setEntries] = useState([]);
    const navigation = useNavigation();

  useEffect(() => {
    Alert.alert(
      'Load Sleep Logs',
      'Would you like to load saved sleep data from the database?',
      [
        {
          text: 'Use Empty Logs',
          style: 'cancel',
          onPress: () => {
            setEntries([]); // fallback to nothing
          },
        },
        {
          text: 'Load Saved',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/sleep`);
              if (!response.ok) throw new Error('Failed to fetch sleep logs');
  
              const sleepData = await response.json();
              setEntries(sleepData);
            } catch (error) {
              console.error('Error fetching sleep logs:', error);
              Alert.alert('Error', 'Failed to load saved sleep logs.');
              setEntries([]); // graceful fallback
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, []);
  

  const fetchSleepLogs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sleep`);
      if (!response.ok) throw new Error('Failed to fetch sleep logs');

      const sleepData = await response.json();
      setEntries(sleepData);
    } catch (error) {
      console.error('Error fetching sleep logs:', error);
      Alert.alert('Error', 'Failed to load sleep logs');
    }
  };

  const handleSave = async () => {
    if (!hoursSlept && !minutesSlept) {
      Alert.alert('Missing Info', 'Please enter sleep duration.');
      return;
    }
  
    const totalMinutes = parseInt(hoursSlept) * 60 + parseInt(minutesSlept || 0);
  
    try {
      const response = await fetch(`${BASE_URL}/sleep`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          durationMinutes: totalMinutes,
          sleepDate: new Date().toISOString(), // today's date
          quality: quality.trim() || 'Unknown',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save sleep log');
      }
  
      await fetchSleepLogs();
      setHoursSlept('');
      setMinutesSlept('');
      setQuality('');
      Alert.alert('Success', 'Sleep log saved!');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save sleep log');
    }
  };
  

  const handleCancel = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('/');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sleep Monitor</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
  <Text style={styles.todayDate}>
    {new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </Text>

  <Text style={styles.label}>Hours Slept</Text>
<TextInput
  style={styles.input}
  value={hoursSlept}
  onChangeText={setHoursSlept}
  keyboardType="numeric"
  placeholder="e.g., 8"
/>

<Text style={styles.label}>Minutes Slept</Text>
<TextInput
  style={styles.input}
  value={minutesSlept}
  onChangeText={setMinutesSlept}
  keyboardType="numeric"
  placeholder="e.g., 30"
/>


  <Text style={styles.label}>Sleep Quality</Text>
  <TextInput
    style={styles.input}
    value={quality}
    onChangeText={setQuality}
    placeholder="Good, Interrupted, etc."
  />
</View>


      <View style={{ marginTop: 32 }}>
        {entries.map((entry, idx) => (
          <View key={idx} style={styles.noteCard}>
            <Text style={styles.noteDate}>
              {new Date(entry.startTime).toLocaleString('en-US', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })} ➔ {new Date(entry.endTime).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
            </Text>
            <Text style={styles.noteText}>Quality: {entry.quality || 'N/A'}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F7F7',
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 16,
  },
  saveButton: {
    color: '#34C759',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noteDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#333',
  },
  todayDate:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
    textAlign: 'center',
  }
});

export default SleepMonitorScreen;
