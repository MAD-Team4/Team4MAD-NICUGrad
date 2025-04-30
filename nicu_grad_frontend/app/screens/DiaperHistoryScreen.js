import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Alert,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../constants/API';

export default function DiaperHistoryScreen() {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchDiaperHistory();
  }, []);

  const fetchDiaperHistory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/diaper`);
      if (!res.ok) throw new Error('Failed to fetch diaper data');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Fetch error:', err);
      Alert.alert('Error', 'Could not load diaper history.');
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Diaper History</Text>

      {entries.length === 0 ? (
        <Text style={styles.noEntries}>No entries yet.</Text>
      ) : (
        entries.map((entry, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>
              {new Date(entry.measuredAt).toLocaleString()}
            </Text>
            <Text>Wet: {entry.wetCount}</Text>
            <Text>Dirty: {entry.dirtyCount}</Text>
            {entry.diaperWeight && (
              <Text>Weight: {entry.diaperWeight} g</Text>
            )}
            {entry.stoolNotes && entry.stoolNotes.trim() !== '' && (
              <Text>Notes: {entry.stoolNotes}</Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    flexGrow: 1,
  },
  backButton: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  noEntries: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
});
