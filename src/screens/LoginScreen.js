import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper';

import { GlobalStyle } from '../utilities/globalstyle';
import AuthService from '../services/AuthService';

const LoginScreen = ({ navigation }) => {
  const authService = new AuthService();

  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    title: '',
    show: false
  });
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const login = async () => {
    try {
      setIsLoading(true);
      await authService.login(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
      if (error.response.status === 404) {
        setSnackbar({
          ...snackbar,
          title: 'Invalid email or password',
          show: true
        });
      } else if (error.response.status === 500) {
        setSnackbar({
          ...snackbar,
          title: 'Internal server error',
          show: true
        });
      } else {
        setCheck({
          ...snackbar,
          title: 'Something went wrong',
          show: true
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo_transparent.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.signInView}>
        <Text style={styles.signInText}>Sign in</Text>
        <Text>Enter your account details.</Text>
      </View>

      {/* <Text style={styles.emailText}>Email</Text> */}

      <TextInput
        style={styles.input}
        placeholder="Email"
        enterKeyHint="next"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(value) =>
          setData({
            ...data,
            email: value
          })
        }
        onSubmitEditing={() => {
          this.secondTextInput.focus();
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        enterKeyHint="done"
        secureTextEntry={true}
        onChangeText={(value) =>
          setData({
            ...data,
            password: value
          })
        }
        ref={(input) => {
          this.secondTextInput = input;
        }}
      />

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={login} style={styles.signInButton}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.signInButtonText}>Sign in</Text>
        )}
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Snackbar
          visible={snackbar.show}
          onDismiss={() =>
            setSnackbar({
              ...snackbar,
              show: false
            })
          }
          action={{
            label: 'ok',
            onPress: () => {
              setSnackbar({
                ...snackbar,
                show: false
              });
            }
          }}>
          {snackbar.title}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(32, 26, 27)'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain'
  },
  signInView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: GlobalStyle.foregroundColor
  },
  emailText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: GlobalStyle.foregroundColor
  },
  input: {
    marginVertical: 25,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#353535',
    marginBottom: 10
  },
  forgotPasswordButton: {
    alignItems: 'flex-end'
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    color: '#98C1D9'
  },
  signInButton: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#EE6C4D'
  },
  signInButtonText: {
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default LoginScreen;
