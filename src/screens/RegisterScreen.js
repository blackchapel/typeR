import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
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
import DatePicker from 'react-native-date-picker';

import { BASE_URL, REGISTER_PATH } from '../utilities/config';
import { GlobalStyle } from '../utilities/globalstyle';
import GoogleImg from '../assets/google.svg';
import RegisterImg from '../assets/registration.svg';

const RegisterScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLable] = useState('Date of Birth');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    alertTitle: '',
    isNotValidCredential: false,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  });

  const checkEmail = (value) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (value.trim().length === 0) {
      setData({
        ...data,
        email: value,
        isValidEmail: true
      });
    } else if (reg.test(value) === true) {
      setData({ ...data, email: value, isValidEmail: true });
    } else {
      setData({ ...data, email: value, isValidEmail: false });
    }
  };

  const checkPassword = (value) => {
    if (value.trim().length === 0) {
      setData({
        ...data,
        password: value,
        isValidPassword: true
      });
    } else if (value.trim().length >= 6) {
      setData({
        ...data,
        password: value,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false
      });
    }
  };

  const checkConfirmPassword = (value) => {
    if (value.trim().length === 0) {
      setData({
        ...data,
        confirmPassword: value,
        isValidConfirmPassword: true
      });
    } else if (value === data.password) {
      setData({
        ...data,
        confirmPassword: value,
        isValidConfirmPassword: true
      });
    } else {
      setData({
        ...data,
        confirmPassword: value,
        isValidConfirmPassword: false
      });
    }
  };

  const register = async () => {
    try {
      if (
        data.name.length == 0 ||
        data.email.length == 0 ||
        data.password.length == 0 ||
        data.confirmPassword.length == 0 ||
        !data.isValidEmail ||
        !data.isValidPassword ||
        !data.isValidConfirmPassword
      ) {
        setData({
          ...data,
          alertTitle: 'Invalid Input',
          isNotValidCredential: true
        });
        return;
      }

      const url = `${BASE_URL}/${REGISTER_PATH}`;
      const res = await axios.post(url, {
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (
        res.status == 201 &&
        res.data.data.token !== 'undefined' &&
        res.data.data.user !== 'undefined'
      ) {
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(res.data.data.token)
        );
        await AsyncStorage.setItem(
          'authEmailId',
          JSON.stringify(res.data.data.authEmailId)
        );
        await AsyncStorage.setItem('user', JSON.stringify(res.data.data.user));
        navigation.navigate('OtpVerify', { navigateTo: 'AppNav' });
      }
    } catch (error) {
      console.log(error);
      setData({
        ...data,
        alertTitle: 'Email already registered',
        isNotValidCredential: true
      });
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.image}>
          <RegisterImg width="300" height="300" />
        </View>

        <View>
          <Text style={styles.registerText}>Register</Text>
        </View>

        <View style={styles.input}>
          <MaterialIcons
            name="person-outline"
            size={22}
            color={GlobalStyle.foregroundColor}
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Name"
            enterKeyHint="next"
            onChangeText={(value) => setData({ ...data, name: value })}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
          />
        </View>

        <View style={styles.input}>
          <MaterialIcons
            name="alternate-email"
            size={22}
            color={GlobalStyle.foregroundColor}
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email ID"
            enterKeyHint="next"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => checkEmail(value)}
            ref={(input) => {
              this.secondTextInput = input;
            }}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }}
          />
        </View>
        {data.isValidEmail ? null : (
          <Text style={styles.error}>Enter a valid email address</Text>
        )}

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
            onChangeText={(value) => checkPassword(value)}
            ref={(input) => {
              this.thirdTextInput = input;
            }}
            onSubmitEditing={() => {
              this.fourthTextInput.focus();
            }}
          />
        </View>
        {data.isValidPassword ? null : (
          <Text style={styles.error}>
            Password must be minimum 6 characters long
          </Text>
        )}

        <View style={styles.input}>
          <MaterialIcons
            name="vpn-key"
            size={22}
            color={GlobalStyle.foregroundColor}
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Confirm Password"
            enterKeyHint="next"
            secureTextEntry={true}
            onChangeText={(value) => checkConfirmPassword(value)}
            ref={(input) => {
              this.fourthTextInput = input;
            }}
          />
        </View>
        {data.isValidConfirmPassword ? null : (
          <Text style={styles.error}>Passwords do not match</Text>
        )}

        <View style={styles.inputDate}>
          <MaterialIcons
            name="cake"
            size={22}
            color={GlobalStyle.foregroundColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text>{dobLabel}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={register} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerOptionsText}>
          <Text>---- or ----</Text>
        </View>

        <View style={styles.registerOptionsView}>
          <TouchableOpacity style={styles.registerOptionsButton}>
            <Text style={styles.registerOptionsButtonText}>
              Sign Up with Google
            </Text>
            <GoogleImg />
          </TouchableOpacity>
        </View>

        <View style={styles.loginView}>
          <Text>Already registered? </Text>
          <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setDobLable(date.toString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

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
                onPress={() =>
                  setData({ ...data, isNotValidCredential: false })
                }>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
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
  registerText: {
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
  inputDate: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GlobalStyle.foregroundColor,
    marginBottom: 10,
    paddingVertical: 15
  },
  registerButton: {
    marginVertical: 20,
    marginHorizontal: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.primaryColor,
    borderRadius: 10
  },
  registerButtonText: {
    color: GlobalStyle.foregroundColor,
    fontWeight: 'bold'
  },
  registerOptionsText: {
    alignItems: 'center',
    marginBottom: 20
  },
  registerOptionsView: {
    width: '100%'
  },
  registerOptionsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: GlobalStyle.foregroundColor,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginHorizontal: 8
  },
  registerOptionsButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#DD4D44',
    marginRight: 10
  },
  loginView: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center'
  },
  loginButton: {
    color: GlobalStyle.primaryColor,
    fontWeight: 'bold'
  },
  alertTitle: {
    textAlign: 'center'
  },
  error: {
    color: GlobalStyle.warningColor,
    fontSize: 14
  }
});

export default RegisterScreen;
