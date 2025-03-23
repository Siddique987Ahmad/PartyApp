import {
  Text,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const EventPage = ({navigation}) => {
  const userId = '67dda5db874a030bf0d61efe';
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [host, setHost] = useState(''); // Replace with actual host ID from auth context
  const [city, setCity] = useState('');
  const [guests, setGuests] = useState('');
  const [averageAge, setAverageAge] = useState('');
  const [male, setMale] = useState('');
  const [female, setFemale] = useState('');
  const [images, setImages] = useState([]);
  const pickImages = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 10},
      response => {
        if (response.didCancel) return;
        if (response.assets) {
          setImages(prevImages => [
            ...prevImages,
            ...response.assets.map(asset => asset.uri),
          ]);
        }
      },
    );
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? '' : date.toISOString();
  };
  const handleCreateEvent = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('information', information);
    formData.append('startTime', formatDate(startTime));
    formData.append('endTime', formatDate(endTime));
    formData.append('host', userId);
    formData.append('city', city);
    formData.append('guests', parseInt(guests) || 0 );
    formData.append('averageAge', parseInt(averageAge) || 0);
    // data.append('genderRatio[male]', Number(male));
    // data.append('genderRatio[female]', Number(female));
    formData.append(
      'genderRatio',
      JSON.stringify({male: parseInt(male) || 0, female: parseInt(female) || 0}),
    );

    images.forEach((imageUri, index) => {
        formData.append('images', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `event_image_${index}.jpg`,
      });
    });
    try {
      console.log('🚀 FormData Debugging:', JSON.stringify(formData, null, 2));

      const response = await axios.post(
        'http://192.168.222.83:4001/api/event/createevent',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            //Accept: 'application/json',
          },
        //   transformRequest: formData => formData,
        },
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Event created successfully');
        // const newEvent = {
        //   id: response.data.eventId || Date.now().toString(), // Use server-provided ID if available
        //   title,
        //   image: images[0] || null, // Use first image if available
        //   startTime: formatDate(startTime),
        //   endTime: formatDate(endTime),
        //   host: userId,
        //   city,
        //   guests: parseInt(guests) || 0,
        //   avgAge: parseInt(averageAge) || 0,
        //   genderRatio: `${male}/${female}`,
        // };
        navigation.navigate('Front',{refresh:true});
      }
    } catch (error) {
        console.error('❌ API Error:', error);
        console.error('❌ Response:', error.response?.data);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to create event',
      );
    }
  };
  return (
    <ScrollView style={{padding: 20}}>
      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{borderBottomWidth: 1}}
      />

      <Text>Information</Text>
      <TextInput
        value={information}
        onChangeText={setInformation}
        style={{borderBottomWidth: 1}}
      />

      <Text>Start Time</Text>
      <TextInput
        value={startTime}
        onChangeText={setStartTime}
        style={{borderBottomWidth: 1}}
        placeholder="YYYY-MM-DDTHH:MM:SSZ"
      />

      <Text>End Time</Text>
      <TextInput
        value={endTime}
        onChangeText={setEndTime}
        style={{borderBottomWidth: 1}}
        placeholder="YYYY-MM-DDTHH:MM:SSZ"
      />

      <Text>City</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        style={{borderBottomWidth: 1}}
      />

      <Text>Guests</Text>
      <TextInput
        value={guests}
        onChangeText={setGuests}
        keyboardType="numeric"
        style={{borderBottomWidth: 1}}
      />

      <Text>Average Age</Text>
      <TextInput
        value={averageAge}
        onChangeText={setAverageAge}
        keyboardType="numeric"
        style={{borderBottomWidth: 1}}
      />

      <Text>Male Guests</Text>
      <TextInput
        value={male}
        onChangeText={setMale}
        keyboardType="numeric"
        style={{borderBottomWidth: 1}}
      />

      <Text>Female Guests</Text>
      <TextInput
        value={female}
        onChangeText={setFemale}
        keyboardType="numeric"
        style={{borderBottomWidth: 1}}
      />

      <TouchableOpacity
        onPress={pickImages}
        style={{marginVertical: 10, backgroundColor: '#ddd', padding: 10}}>
        <Text>Pick Images</Text>
      </TouchableOpacity>

      {images.map((img, index) => (
        <Image
          key={index}
          source={{uri: img}}
          style={{width: 100, height: 100, marginVertical: 3}}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>CREATE EVENT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
export default EventPage;
