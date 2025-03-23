// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const FrontPage = ({ navigation, route }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [partyType, setPartyType] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [events, setEvents] = useState([
//     {
//       id: '1',
//       title: 'Spring Break Bash',
//       image: 'https://example.com/party.jpg',
//       startTime: '2025-03-23 21:00',
//       endTime: '2025-03-24 02:00',
//       host: 'John Doe',
//       city: 'New York',
//       guests: 50,
//       avgAge: 24,
//       genderRatio: '60/40',
//     },
//   ]);

//   // Listen for new events from EventPage
//   useEffect(() => {
//     if (route.params?.newEvent) {
//       setEvents(prevEvents => [...prevEvents, route.params.newEvent]);
//     }
//   }, [route.params?.newEvent]);

//   const renderEvent = ({ item }) => (
//     <View style={styles.eventCard}>
//       {item.image && <Image source={{ uri: item.image }} style={styles.eventImage} />}
//       <View style={styles.eventDetails}>
//         <Text style={styles.eventTitle}>{item.title}</Text>
//         <Text>{`${item.startTime} - ${item.endTime}`}</Text>
//         <Text>{`Host: ${item.host}`}</Text>
//         <Text>{`Location: ${item.city}`}</Text>
//         <Text>{`Guests: ${item.guests}`}</Text>
//         <Text>{`Avg Age: ${item.avgAge}`}</Text>
//         <Text>{`M/F Ratio: ${item.genderRatio}`}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Search and Filter Section */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search events..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.iconButton} onPress={() => {/* Open party type modal */}}>
//           <Icon name="celebration" size={30} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton} onPress={() => {/* Open map modal */}}>
//           <Icon name="map" size={30} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {partyType && (
//         <View style={styles.filterDisplay}>
//           <Text>Party Type: {partyType}</Text>
//         </View>
//       )}

//       {location && (
//         <View style={styles.filterDisplay}>
//           <Text>{`Location: ${location} (${distance}km)`}</Text>
//         </View>
//       )}

//       <FlatList
//         data={events.filter(event =>
//           (!searchQuery || event.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
//           (!partyType || event.type === partyType) &&
//           (!location || event.city === location)
//         )}
//         renderItem={renderEvent}
//         keyExtractor={item => item.id}
//         style={styles.eventsList}
//       />

//       <TouchableOpacity
//         style={styles.createButton}
//         onPress={() => navigation.navigate('CreateEvent')}>
//         <Text style={styles.createButtonText}>Create Event</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     alignItems: 'center',
//   },
//   searchInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 8,
//     marginRight: 10,
//   },
//   iconButton: {
//     padding: 5,
//   },
//   filterDisplay: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//   },
//   eventsList: {
//     flex: 1,
//   },
//   eventCard: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   eventImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   eventDetails: {
//     flex: 1,
//   },
//   eventTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   createButton: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     margin: 10,
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     right: 10,
//   },
//   createButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default FrontPage;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const FrontPage = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [partyType, setPartyType] = useState(null);
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events from the backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      console.log('Fetching events from: http://192.168.222.83:4001/api/event/getallevents');
      const response = await axios.get('http://192.168.222.83:4001/api/event/getallevents'); // Adjust endpoint
      console.log('Response data:', response.data);
      // Ensure response.data is an array
    // let eventArray = Array.isArray(response.data) ? response.data : response.data.events || [];
    // if (!Array.isArray(eventArray)) {
    //   console.warn('Response data is not an array:', eventArray);
    //   eventArray = []; // Fallback to empty array
    // }
    let eventArray = response.data.allEvents || response.data || [];
      if (!Array.isArray(eventArray)) {
        console.warn('Response data is not an array:', eventArray);
        eventArray = [];
      }
    const fetchedEvents = eventArray.map(event => ({
      id: event._id,
      title: event.title,
      image: event.images?.[0] || null,
      startTime: event.startTime,
      endTime: event.endTime,
      host: event.host,
      city: event.city,
      guests: event.guests,
      avgAge: event.averageAge,
      genderRatio: `${event.genderRatio?.male || 0}/${event.genderRatio?.female || 0}`,
    }));
    setEvents(fetchedEvents);
  } catch (error) {
    console.error('❌ Fetch Events Error:', error);
    if (error.response) {
      console.log('Server responded with:', error.response.data);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error setting up request:', error.message);
    }
    setEvents([]); // Fallback to empty array on error
  } finally {
    setLoading(false);
  }
  };
  const deleteEvent = async (eventId) => {
    try {
      const url = `http://192.168.222.83:4001/api/event/deleteevent/${eventId}`; // Adjust for your setup
      console.log('Deleting event at:', url);
      const response = await axios.delete(url);

      if (response.status === 200) {
        // Remove the event from the state
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        Alert.alert('Success', 'Event deleted successfully');
      }
    } catch (error) {
      console.error('❌ Delete Event Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to delete event');
    }
  };

  const handleDelete = (eventId) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteEvent(eventId), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };
  // Fetch events on mount and when refresh is triggered
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      fetchEvents();
      navigation.setParams({ refresh: false });
    }
  }, [route.params?.refresh, navigation]);

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      {item.image && <Image source={{ uri: item.image }} style={styles.eventImage} />}
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text>{`${item.startTime} - ${item.endTime}`}</Text>
        <Text>{`Host: ${item.host}`}</Text>
        <Text>{`Location: ${item.city}`}</Text>
        <Text>{`Guests: ${item.guests}`}</Text>
        <Text>{`Avg Age: ${item.avgAge}`}</Text>
        <Text>{`M/F Ratio: ${item.genderRatio}`}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('UpdateEvent', { event: item })}
        >
          <Icon name="edit" size={24} color="#007AFF" />
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Icon name="delete" size={24} color="#FF0000" />
      </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search and Filter Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => {/* Open party type modal */}}>
          <Icon name="celebration" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => {/* Open map modal */}}>
          <Icon name="map" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {partyType && (
        <View style={styles.filterDisplay}>
          <Text>Party Type: {partyType}</Text>
        </View>
      )}

      {location && (
        <View style={styles.filterDisplay}>
          <Text>{`Location: ${location} (${distance}km)`}</Text>
        </View>
      )}

      {loading ? (
        <Text style={styles.loadingText}>Loading events...</Text>
      ) : (
        <FlatList
          data={events.filter(event =>
            (!searchQuery || event.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (!partyType || event.type === partyType) &&
            (!location || event.city === location)
          )}
          renderItem={renderEvent}
          keyExtractor={item => item.id}
          style={styles.eventsList}
        />
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent')}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  iconButton: {
    padding: 5,
  },
  filterDisplay: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  eventsList: {
    flex: 1,
  },
  eventCard: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 5,
    marginRight: 10,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FrontPage;
