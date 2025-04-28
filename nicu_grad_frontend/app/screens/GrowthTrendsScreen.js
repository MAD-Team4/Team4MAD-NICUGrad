// nicu_grad_frontend/app/screens/GrowthTrendsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import LineGraph from '../components/LineGraph';
import NotesInput from '../components/NotesInput';
import WeightInputCard from '../components/WeightInputCard';
import { useNavigation } from '@react-navigation/native';
import { generateFakeGrowthData } from '../components/fakeGrowthdata';
import { BASE_URL } from '../../constants/API';

const GrowthTrendsScreen = () => {
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
     Alert.alert(
       'Load Growth Data',
       'Would you like to load saved data from the database?',
       [
         {
           text: 'Use Fake Data',
           style: 'cancel',
           onPress: () => {
             const fakeData = generateFakeGrowthData(7);
             const formattedFakeEntries = fakeData.labels.map((label, index) => ({
               date: label,
               weight: fakeData.values[index],
               notes: '',
             }));
             setEntries(formattedFakeEntries);
           },
         },
         {
           text: 'Load Saved',
           onPress: async () => {
             try {
              const response = await fetch(`${BASE_URL}/growth`);

               if (!response.ok) throw new Error('Failed to fetch growth data');
              
               const growthData = await response.json();
              
               const formattedEntries = growthData.map(item => ({
                 date: new Date(item.measuredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                 weight: item.weightG,
                 notes: item.notes || '',
               }));
              
               setEntries(formattedEntries);
             } catch (error) {
               console.error('Error loading data:', error);
               Alert.alert('Error', 'Failed to load saved data. Using fake data instead.');
               const fallbackFake = generateFakeGrowthData(7);
               const formattedFake = fallbackFake.labels.map((label, index) => ({
                 date: label,
                 weight: fallbackFake.values[index],
                 notes: '',
               }));
               setEntries(formattedFake);
             }
           },
         },
       ],
       { cancelable: false }
     );
   }, []);

   const handleSave = async () => {
    if (!weight) {
      Alert.alert('Missing Info', 'Please enter today\'s weight.');
      return;
    }
  
    const today = new Date().toISOString();  // ISO format expected for measuredAt
  
    try {
      const response = await fetch(`${BASE_URL}/growth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weightG: parseFloat(weight),
          measuredAt: today,
          notes: notes.trim() !== '' ? notes : 'N/A',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save weight');
      }
  
      // ✅ Instead of adding manually, refresh the entries from server:
      await fetchGrowthEntries();
  
      setWeight('');
      setNotes('');
      Alert.alert('Success', 'Weight saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save weight entry');
    }
  };
  
  

  const handleCancel = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('/'); // Go back to HomeScreen if no history
    }
  };

  const graphData = {
    labels: entries.map(entry => entry.date),
    values: entries.map(entry => entry.weight),
  };

  const handleStartFresh = () => {
    Alert.alert(
      'Start Fresh?',
      'This will erase all existing weight data and start fresh. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setEntries([]); // Clear entries
          },
        },
      ]
    );
  };

  const fetchGrowthEntries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/growth`);
      if (!response.ok) throw new Error('Failed to fetch growth entries');
  
      const growthData = await response.json();
      const formattedEntries = growthData.map(item => ({
        date: new Date(item.measuredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: item.weightG,
        notes: item.notes || '',
      }));
  
      setEntries(formattedEntries);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to load growth entries');
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Growth Trends</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleStartFresh}>
            <Text style={styles.resetButton}>Start Fresh</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Morning Weight (g)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Enter weight in grams"
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Health Notes (Optional)</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter any observations"
          multiline
        />
      </View>

      <LineGraph data={graphData} title="Weight Progress" yAxisSuffix="g" />
      
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
  resetButton:{
    color: '#FF3B30',
    fontSize: 16,
    marginRight: 12,
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
  },
  notesInput: {
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
});

export default GrowthTrendsScreen;
