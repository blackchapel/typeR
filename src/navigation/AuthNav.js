import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createMaterialBottomTabNavigator();

function AuthNav() {
  return (
    <Tab.Navigator
    //   activeColor="#98C1D9"
    //   barStyle={{ backgroundColor: '#293241' }}
    >
      <Tab.Screen
        name="Home"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default AuthNav;
