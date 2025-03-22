import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import 'react-native-gesture-handler';

//screens
import LoginScreen from './Screens/loginScreen';
import RegisterScreen from './Screens/registerScreen';
import FrontPage from './Screens/FrontPage';
import EventPage from './Screens/EventPage';
import HomePage from './Screens/HomePage';
const Stack = createNativeStackNavigator();

const App = () => {
  console.log('object');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Front" component={FrontPage}/>
        <Stack.Screen name="CreateEvent" component={EventPage} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
