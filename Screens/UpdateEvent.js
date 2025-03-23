import React, { useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const UpdateEvent = ({ navigation, route }) => {
  const { event } = route.params; // Event data passed from FrontPage
  const [title, setTitle] = useState(event.title || '');
  const [information, setInformation] = useState(event.information || '');
  const [startTime, setStartTime] = useState(event.startTime || '');
  const [endTime, setEndTime] = useState(event.endTime || '');
  const [host, setHost] = useState(event.host || '');
  const [city, setCity] = useState(event.city || '');
  const [guests, setGuests] = useState(event.guests?.toString() || '');
  const [averageAge, setAverageAge] = useState(event.avgAge?.toString() || '');

  const handleUpdateEvent = async () => {
    try {
      const updatedEvent = {
        title,
        information,
        startTime,
        endTime,
        host,
        city,
        guests: parseInt(guests) || 0,
        averageAge: parseInt(averageAge) || 0,
      };

      const url = `http://192.168.222.83:4001/api/event/updateevent/${event.id}`; // Adjust for your setup
      const response = await axios.put(url, updatedEvent);

      if (response.status === 200) {
        Alert.alert('Success', 'Event updated successfully');
        navigation.navigate('Front', { refresh: true }); // Trigger refresh on FrontPage
      }
    } catch (error) {
      console.error('❌ Update Event Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update event');
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text>Information</Text>
      <TextInput
        value={information}
        onChangeText={setInformation}
        style={styles.input}
      />

      <Text>Start Time</Text>
      <TextInput
        value={startTime}
        onChangeText={setStartTime}
        style={styles.input}
        placeholder="YYYY-MM-DDTHH:MM:SSZ"
      />

      <Text>End Time</Text>
      <TextInput
        value={endTime}
        onChangeText={setEndTime}
        style={styles.input}
        placeholder="YYYY-MM-DDTHH:MM:SSZ"
      />

      <Text>Host</Text>
      <TextInput
        value={host}
        onChangeText={setHost}
        style={styles.input}
      />

      <Text>City</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <Text>Guests</Text>
      <TextInput
        value={guests}
        onChangeText={setGuests}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Average Age</Text>
      <TextInput
        value={averageAge}
        onChangeText={setAverageAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
        <Text style={styles.buttonText}>UPDATE EVENT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
});

export default UpdateEvent;
