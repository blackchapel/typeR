import axios from 'axios';

import { BASE_URL, LOGIN_PATH } from '../utilities/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  async login(data) {
    let url = `${BASE_URL}/${LOGIN_PATH}`;
    let res = await axios.post(url, {
      email: data.email,
      password: data.password
    });
    await AsyncStorage.setItem('token', JSON.stringify(res.data.data.token));
    await AsyncStorage.setItem('user', JSON.stringify(res.data.data.user));
  }
}

export default AuthService;
