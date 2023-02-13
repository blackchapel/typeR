import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthNav from './navigation/AuthNav';
import LoginScreen from './screens/LoginScreen';
import EventCardComponent from './components/EventCardComponent';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    // <LoginScreen />
    <EventCardComponent />
    // <HomeScreen />
    // <NavigationContainer>
    //   <AuthNav />
    // </NavigationContainer>
  );
};

export default App;
