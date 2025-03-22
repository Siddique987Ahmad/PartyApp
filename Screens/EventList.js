import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text, Image,FlatList} from 'react-native';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const testData = [
    {
        _id: "65fa8bdfc3f7e1d2a7f6d123",
        title: "Midnight Party",
        city: "New York",
        startTime: "2025-04-01T20:00:00.000Z",
    }
];
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            console.log("Fetching events..."); // Debugging start
          const response = await fetch(
            'http://192.168.222.239:4001/api/event/getallevents',
          );
          const data = await response.json();
          console.log("Fetched Events:", data); // Log API response
          if (data.allEvents) {
            setEvents(data.allEvents); // Update state with actual event array
          } else {
            setEvents([]); // Fallback to empty array
          }
          //setEvents(data);
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setLoading(false);
        }
      };
    fetchEvents();
  }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch(
//         'http://192.168.222.239:4001/api/event/getallevents',
//       );
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={{padding: 10}}>
    {events.length > 0 ? (
      <FlatList
        data={events}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View
            style={{marginBottom: 20, borderBottomWidth: 1, paddingBottom: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
            <Text>{item.information}</Text>
            <Text>City: {item.city}</Text>
            <Text>Start: {new Date(item.startTime).toLocaleString()}</Text>
            <Text>End: {new Date(item.endTime).toLocaleString()}</Text>
            {item.pictures.length > 0 && (
              <Image
                source={{uri: `http://192.168.222.239:4001${item.pictures[0]}`}}
                style={{width: 200, height: 150, marginTop: 10}}
              />
            )}
          </View>
        )}
      />
      ) : (
    <Text>No events available</Text>
)}
    </View>
  );
};

export default EventList;
