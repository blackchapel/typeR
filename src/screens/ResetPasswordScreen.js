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

const ResetPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.image}>
        <LoginImg width="300" height="300" />
      </View>

      <View>
        <Text style={styles.loginText}>Reset Password</Text>
      </View>

      <View style={styles.input}>
        <MaterialIcons
          name="vpn-key"
          size={22}
          color={GlobalStyle.foregroundColor}
          style={{ marginRight: 5 }}
        />
        <TextInput
          placeholder="Password"
          enterKeyHint="next"
          secureTextEntry={true}
          onSubmitEditing={() => {
            this.SecondTextInput.focus();
          }}
        />
      </View>

      <View style={styles.input}>
        <MaterialIcons
          name="vpn-key"
          size={22}
          color={GlobalStyle.foregroundColor}
          style={{ marginRight: 5 }}
        />
        <TextInput
          placeholder="Confirm Password"
          enterKeyHint="done"
          secureTextEntry={true}
          ref={(input) => {
            this.SecondTextInput = input;
          }}
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
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
  confirmButton: {
    marginVertical: 20,
    marginHorizontal: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.primaryColor,
    borderRadius: 10
  },
  confirmButtonText: {
    color: GlobalStyle.foregroundColor,
    fontWeight: 'bold'
  }
});

export default ResetPasswordScreen;
