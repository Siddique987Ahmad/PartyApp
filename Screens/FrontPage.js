// /* eslint-disable no-unused-vars */
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// //import {useNavigation} from '@react-navigation/native';

// const FrontPage = ({navigation}) => {

//   const [searchQuery, setSearchQuery] = useState('');
//   const [partyType, setPartyType] = useState('All');
//   const [location, setLocation] = useState(null);

//   // Dummy data for event previews
//   const events = [
//     {
//       id: '1',
//       picture: 'https://via.placeholder.com/150',
//       title: 'Pool Party',
//       startTime: '8:00 PM',
//       endTime: '2:00 AM',
//       host: 'John Doe',
//       city: 'New York',
//       guests: 50,
//       avgAge: 25,
//       maleFemaleRatio: '60/40',
//     },
//     {
//       id: '2',
//       picture: 'https://via.placeholder.com/150',
//       title: 'Rooftop Bash',
//       startTime: '9:00 PM',
//       endTime: '3:00 AM',
//       host: 'Jane Smith',
//       city: 'Los Angeles',
//       guests: 30,
//       avgAge: 28,
//       maleFemaleRatio: '50/50',
//     },
//   ];

//   const handleSearch = () => {
//     // Filter events based on searchQuery, partyType, and location
//     console.log('Searching for:', searchQuery, partyType, location);
//   };

//   const handleCreateEvent = () => {
//     navigation.navigate('CreateEvent');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar and Icons */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search events..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity onPress={() => setPartyType('Pre-parties')}>
//           <Icon name="glass" size={24} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Map')}>
//           <Icon name="map-marker" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Event Previews */}
//       <FlatList
//         data={events}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <View style={styles.eventPreview}>
//             <Image source={{uri: item.picture}} style={styles.eventImage} />
//             <Text style={styles.eventTitle}>{item.title}</Text>
//             <Text>{`${item.startTime} - ${item.endTime}`}</Text>
//             <Text>Host: {item.host}</Text>
//             <Text>City: {item.city}</Text>
//             <Text>Guests: {item.guests}</Text>
//             <Text>Avg Age: {item.avgAge}</Text>
//             <Text>Male/Female: {item.maleFemaleRatio}</Text>
//           </View>
//         )}
//       />

//       {/* Create Event Button */}
//       <TouchableOpacity
//         style={styles.createEventButton}
//         onPress={handleCreateEvent}>
//         <Text style={styles.createEventButtonText}>Create Event</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   searchBar: {
//     flex: 1,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 8,
//     marginRight: 8,
//   },
//   eventPreview: {
//     marginBottom: 16,
//     padding: 16,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   eventImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   createEventButton: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     right: 16,
//     backgroundColor: '#007BFF',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   createEventButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default FrontPage;

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import EventList from './EventList';
import React from 'react';

const FrontPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>FrontPage</Text>
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={() => navigation.navigate('CreateEvent')}>
        <Text style={styles.createEventButtonText}>Create Event</Text>
      </TouchableOpacity>
      <EventList/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  createEventButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createEventButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FrontPage;
