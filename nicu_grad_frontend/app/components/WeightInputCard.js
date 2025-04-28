// nicu_grad_frontend/app/components/WeightInputCard.js

import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function WeightInputCard({ weight, setWeight }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Morning Weight (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
});
