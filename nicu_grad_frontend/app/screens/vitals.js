import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const VitalsScreen = ({ navigation }) => {
  const [temp, setTemp] = useState('');
  const [hr, setHr] = useState('');
  const [br, setBr] = useState('');
  const [spo2, setSpo2] = useState('');
  const [note, setNote] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();
  const [vitals, setVitals] = useState([
    //Example data
    {
      temp: '97.8',
      hr: '128',
      br: '32',
      spo2: '97',
      note: 'Restless night',
      timestamp: '4/27/2025, 11:02 AM'
    }
  ]);

  // Most recent vital 
  const latestVital = vitals[0];

  const allFieldsFilled = temp && hr && br && spo2;

  // Logs the vital
  const logVital = () => {
    const timestamp = new Date().toLocaleString();
    setVitals([{ temp, hr, br, spo2, note, timestamp }, ...vitals]);
    setTemp(''); setHr(''); setBr(''); setSpo2(''); setNote('');
  };

  // Handles different views.
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={26} color="#0984e3" />
      </TouchableOpacity>

      <Text style={styles.header}>Vitals</Text>

      {showHistory ? (
      <>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vitals History</Text>
          {vitals.length > 0 ? (
            vitals.map((entry, index) => (
              <View key={index} style={styles.vitalEntryCard}>
                <Text style={styles.entryTimestamp}>{entry.timestamp}</Text>
                <Text><Text style={styles.entryLabel}>Temp:</Text> {entry.temp}°F</Text>
                <Text><Text style={styles.entryLabel}>HR:</Text> {entry.hr} bpm</Text>
                <Text><Text style={styles.entryLabel}>BR:</Text> {entry.br}/min</Text>
                <Text><Text style={styles.entryLabel}>O2:</Text> {entry.spo2}%</Text>
                {entry.note ? (
                  <Text><Text style={styles.entryLabel}>Note:</Text> {entry.note}</Text>
                ) : null}
              </View>
            ))
          ) : (
            <Text style={styles.noVitals}>No vitals logged yet.</Text>
          )}
        </View>

        {showHistory && (
          <TouchableOpacity style={styles.backArrow} onPress={() => setShowHistory(false)}>
            <MaterialCommunityIcons name="arrow-left" size={26} color="#0984e3" />
          </TouchableOpacity>
        )}
      </>
      ) : (
        <>
          {/* Summary */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Most Recent Entry</Text>
            {latestVital ? (
              <>
                <VitalRow icon="thermometer" label="Temp" value={`${latestVital.temp}°F`} />
                <VitalRow icon="heart-pulse" label="HR" value={`${latestVital.hr} bpm`} />
                <VitalRow icon="lungs" label="BR" value={`${latestVital.br}/min`} />
                <VitalRow icon="water-percent" label="O2" value={`${latestVital.spo2}%`} />
                {latestVital.note ? <Text style={styles.note}>Note: {latestVital.note}</Text> : null}
                <Text style={styles.time}>{latestVital.timestamp}</Text>
              </>
            ) : (
              <Text style={styles.noVitals}>No vitals logged yet.</Text>
            )}
          </View>

          <Text style={styles.sectionTitle}>Add New Vitals</Text>
          <View style={styles.inputCard}>
            <VitalInput icon="thermometer" label="Temperature (°F)" value={temp} onChange={setTemp} keyboardType="numeric" />
            <VitalInput icon="heart-pulse" label="Heart Rate (bpm)" value={hr} onChange={setHr} keyboardType="numeric" />
            <VitalInput icon="lungs" label="Breathing Rate" value={br} onChange={setBr} keyboardType="numeric" />
            <VitalInput icon="water-percent" label="Oxygen Saturation (%)" value={spo2} onChange={setSpo2} keyboardType="numeric" />
            <TextInput
              style={styles.noteInput}
              placeholder="Notes (optional)"
              value={note}
              onChangeText={setNote}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: allFieldsFilled ? '#00B894' : '#B2BEC3' }]}
              onPress={logVital}
              disabled={!allFieldsFilled}
            >
              <Text style={styles.buttonText}>Add Vitals Entry</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.seeAllButton} onPress={() => setShowHistory(true)}>
            <Text style={styles.seeAllButtonText}>See Past Vitals</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};


// Row for displaying a vital sign in the card
const VitalRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <MaterialCommunityIcons name={icon} size={20} color="#0984e3" />
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const VitalInput = ({ icon, label, value, onChange, keyboardType }) => (
  <View style={styles.inputRow}>
    <MaterialCommunityIcons name={icon} size={22} color="#0984e3" style={{ marginRight: 8 }} />
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      placeholder={label}
      placeholderTextColor="#b2bec3"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f8fafd', 
    padding: 16 
  },
  header: { fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 16, 
    textAlign: 'center', 
    marginTop: 0 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#636e72',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 1
  },
  cardTitle: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  label: { 
    marginLeft: 8, 
    //width: 40, 
    fontWeight: 'bold', 
    color: '#636e72' 
  },
  value: { 
    marginLeft: 5, 
    fontSize: 15, 
    color: '#222' 
  },
  note: { 
    marginTop: 5, 
    fontStyle: 'italic', 
    color: '#636e72' 
  },
  time: { 
    marginTop: 6, 
    color: '#b2bec3', 
    fontSize: 13, 
    textAlign: 'right'
  },
  noVitals: { 
    color: '#636e72', 
    marginBottom: 6, 
    textAlign: 'center' 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    marginTop: 8, 
    color: '#0984e3' 
  },
  inputCard: {
    backgroundColor: '#fff', 
    borderRadius: 14, 
    padding: 14, 
    marginBottom: 18,
    shadowColor: "#636e72", 
    shadowOpacity: 0.04, 
    shadowRadius: 2, 
    elevation: 1,
  },
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  input: { 
    flex: 1, 
    borderBottomWidth: 1, 
    borderColor: '#dfe6e9', 
    padding: 6, 
    fontSize: 15 
  },
  noteInput: {
    borderWidth: 1, 
    borderColor: '#dfe6e9', 
    borderRadius: 10, 
    padding: 8, 
    marginTop: 6, 
    backgroundColor:'#fff',
    fontSize: 14, 
    minHeight: 36, 
    marginBottom: 10
  },
  button: { 
    marginVertical: 10, 
    padding: 13, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  seeAllButton: {
    backgroundColor: '#0984e3', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginVertical: 14,
  },
  seeAllButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 17 
  },
  vitalEntryCard: {
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  entryTimestamp: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  entryLabel: {
    fontWeight: 'bold',
    color: '#2d3436',
  },
  backArrow: {
    position: 'absolute',
    top: 14,
    left: 14,
    padding: 4,
    zIndex: 10,
    marginBottom: 30
  }  
});

export default VitalsScreen;