// nicu_grad_frontend/app/components/NotesInput.js

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function NotesInput({ notes, setNotes }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter health notes..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  input: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
});
