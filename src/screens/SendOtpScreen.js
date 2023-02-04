import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { GlobalStyle } from '../utilities/globalstyle';
import LoginImg from '../assets/login.svg';

const SendOtpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.image}>
        <LoginImg width="300" height="300" />
      </View>

      <View>
        <Text style={styles.loginText}>Enter Email ID</Text>
      </View>

      <View style={styles.input}>
        <MaterialIcons
          name="alternate-email"
          size={22}
          color={GlobalStyle.foregroundColor}
        />
        <TextInput
          placeholder="Email ID"
          enterKeyHint="done"
          keyboardType="email-address"
          onChangeText={(val) => setEmail(val)}
          value={email}
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('OtpVerify')}
          style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: GlobalStyle.backgroundColor,
    padding: 15
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: GlobalStyle.foregroundColor,
    fontWeight: 'bold',
    fontSize: 27,
    marginBottom: 15
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GlobalStyle.foregroundColor,
    marginBottom: 10
  },
  continueButton: {
    marginVertical: 20,
    marginHorizontal: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.primaryColor,
    borderRadius: 10
  },
  continueButtonText: {
    color: GlobalStyle.foregroundColor,
    fontWeight: 'bold'
  }
});

export default SendOtpScreen;
