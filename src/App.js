import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthNav from './navigation/AuthNav';

const App = () => {
  return (
    <NavigationContainer>
      <AuthNav />
    </NavigationContainer>
  );
};

export default App;
