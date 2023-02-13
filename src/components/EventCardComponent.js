import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EventCardComponent = ({ name, image }) => {
  return (
    <View style={styles.body}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/xreventi.appspot.com/o/images%2F945986.jpg%20%2B?alt=media&token=82278ffe-52d2-4fe5-ac14-15e15438ad17'
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Hello</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="arrow-right"
            size={35}
            color={'#FFD9DF'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '33.33%',
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: 'rgb(124, 41, 64)',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '80%'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 12,
    paddingLeft: 10,
    color: 'rgb(255, 217, 223)'
  },
  icon: { paddingTop: 12, paddingRight: 10 }
});

export default EventCardComponent;
