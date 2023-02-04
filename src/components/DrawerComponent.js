import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { GlobalStyle } from '../utilities/globalstyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerComponent = (props) => {
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    props.navigation.replace('Login');
  };

  return (
    <View style={styles.body}>
      <DrawerContentScrollView {...props} contentContainerStyle>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.bottomButton}>
          <MaterialIcons
            name="share"
            size={22}
            color={GlobalStyle.foregroundColor}
          />
          <Text style={styles.bottomText}> Tell a friend </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logout} style={styles.bottomButton}>
          <MaterialIcons
            name="logout"
            size={22}
            color={GlobalStyle.foregroundColor}
          />
          <Text style={styles.bottomText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#000000'
  },
  bottomView: {
    padding: 20,
    borderWidth: 1,
    borderTopColor: GlobalStyle.foregroundColor
  },
  bottomButton: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center'
  },
  bottomText: {
    color: GlobalStyle.foregroundColor,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default DrawerComponent;
