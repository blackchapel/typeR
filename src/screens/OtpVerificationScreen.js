import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BASE_URL, OTPVERIFY_PATH } from '../utilities/config';
import { GlobalStyle } from '../utilities/globalstyle';
import LoginImg from '../assets/login.svg';

const OtpVerificationScreen = ({ route, navigation }) => {
  const [data, setData] = useState({
    otp: '',
    alertTitle: '',
    isNotValidCredential: false
  });

  const verifyOtp = async () => {
    try {
      if (data.otp.length == 0) {
        setData({
          ...data,
          alertTitle: 'Invalid Input',
          isNotValidCredential: true
        });
        return;
      }

      const url = `${BASE_URL}/${OTPVERIFY_PATH}`;
      const authEmailId = await AsyncStorage.getItem('authEmailId');
      const token = await AsyncStorage.getItem('token');

      console.log(authEmailId);

      const res = await axios.post(
        url,
        {
          emailOtp: data.otp,
          authEmailId: authEmailId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      );

      if (
        res.status == 200 &&
        res.data.data.token !== 'undefined' &&
        res.data.data.user !== 'undefined'
      ) {
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(res.data.data.token)
        );
        await AsyncStorage.setItem('user', JSON.stringify(res.data.data.user));
        navigation.replace(route.params.navigateTo);
      }
    } catch (error) {
      console.error(error);
      setData({
        ...data,
        alertTitle: 'Incorrect OTP',
        isNotValidCredential: true
      });
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.image}>
        <LoginImg width="300" height="300" />
      </View>

      <View>
        <Text style={styles.loginText}>Verify OTP</Text>
      </View>

      <View style={styles.input}>
        <MaterialIcons
          name="lock"
          size={22}
          color={GlobalStyle.foregroundColor}
        />
        <TextInput
          placeholder="OTP"
          enterKeyHint="done"
          keyboardType="numeric"
          onChangeText={(value) =>
            setData({
              ...data,
              otp: value
            })
          }
        />
      </View>

      <View>
        <TouchableOpacity onPress={verifyOtp} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <Portal>
        <Dialog
          visible={data.isNotValidCredential}
          onDismiss={() => setData({ ...data, isNotValidCredential: false })}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={styles.alertTitle}>
            {data.alertTitle}
          </Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => setData({ ...data, isNotValidCredential: false })}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  },
  alertTitle: {
    textAlign: 'center'
  }
});

export default OtpVerificationScreen;
