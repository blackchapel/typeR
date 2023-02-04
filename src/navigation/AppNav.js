import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DrawerComponent from '../components/DrawerComponent';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { GlobalStyle } from '../utilities/globalstyle';

const Drawer = createDrawerNavigator();

const AppNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerComponent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: GlobalStyle.primaryColor,
        drawerActiveTintColor: GlobalStyle.foregroundColor,
        drawerInactiveTintColor: GlobalStyle.foregroundColor,
        drawerLabelStyle: { marginLeft: 5 }
      }}>
      <Drawer.Screen
        component={HomeScreen}
        name="Home"
        options={{
          drawerIcon: ({ color }) => {
            <MaterialIcons name="home" size={22} color={color} />;
          }
        }}
      />
      <Drawer.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          drawerIcon: ({ color }) => {
            <MaterialIcons name="person" size={22} color={color} />;
          }
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNav;
