import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const tools = [
  'Feeding',
  'Diaper',
  'Medication',
  'Growth',
  'Vitals',
  'Sleep',
  'Health Events',
];

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.tileContainer}>
        {tools.map((tool, i) => (
          <Link
            key={i}
            href={`/${tool.toLowerCase().replace(/\s+/g, '-')}`}
            asChild
          >
            <TouchableOpacity style={styles.tile}>
              <Text style={styles.tileText}>{tool}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <Link href="/settings" asChild>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>⚙ Settings</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tileContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '47%',
    height: 100,
    marginBottom: 20,
    backgroundColor: '#e1f5fe',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  settingsButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#c8e6c9',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  settingsText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
