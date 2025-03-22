import React from "react";
import { View, Text } from "react-native";
import EventList from "./EventList";

const HomePage = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, textAlign: "center", marginVertical: 10 }}>Upcoming Events</Text>
            <EventList />
        </View>
    );
};

export default HomePage;
