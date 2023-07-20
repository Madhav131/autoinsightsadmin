import React, {useContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RESTORE_TOKEN,
  RESTORE_ROLE,
  LOGOUT_USER,
  FRANCHISE_BEGIN,
  FRANCHISE_SUCCESS,
  FRANCHISE_ERROR,
  INSPECTION_BEGIN,
  INSPECTION_SUCCESS,
  INSPECTION_ERROR,
} from '../Utils/action';
import {
  login_check_url,
  ACCEPT_HEADER,
  franchise_check_url,
  inspection_check_url,
} from '../Utils/baseurl';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import user_reducer from '../Reducer/user_reducer';
const UserContext = React.createContext();
const initialState = {
  login_loading: false,
  token: '',
  role: '',
  userinfo: '',
  franchise_loding: false,
  franchise_array: [],
  inspection_loding: false,
  inspection_data: [],
  role: '',
};

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(user_reducer, initialState);
  const [refresh, setRefresh] = useState('');
  const Login = async (formdata, props) => {
    dispatch({type: LOGIN_BEGIN});

    axios
      .post(login_check_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      })
      .then(res => {
        if (res.data.success == 1) {
          Toast.show(res.data.message);

          AsyncStorage.setItem('token', res.data.token);
          props.navigation.replace('MainTabScreen');
          AsyncStorage.setItem('userinfo', JSON.stringify(res.data.user));
          AsyncStorage.setItem('islogin', 'true');
          dispatch({type: LOGIN_SUCCESS, payload: res.data});
          setRefresh(1);
        } else {
          Toast.show(res.data.message);
          dispatch({type: LOGIN_ERROR, payload: ''});
        }
      })
      .catch(err => {
        console.log('err', err);
        dispatch({type: LOGIN_ERROR, payload: ''});
      });
  };

  const Franchise = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: FRANCHISE_BEGIN});

    axios
      .get(franchise_check_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          dispatch({type: FRANCHISE_SUCCESS, payload: res.data});
        }
      })
      .catch(err => {
        console.log('err', err);
        dispatch({type: FRANCHISE_ERROR, payload: ''});
      });
  };
  const Inspection = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: INSPECTION_BEGIN});

    axios
      .get(inspection_check_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        // console.log('ff', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          dispatch({type: INSPECTION_SUCCESS, payload: res.data});
          props.navigation.navigate('Subservice');
        }
      })
      .catch(err => {
        console.log('err', err);
        dispatch({type: INSPECTION_ERROR, payload: ''});
      });
  };

  const setLogout = async props => {
    await dispatch({type: LOGOUT_USER});
    await props.navigation.reset({
      routes: [{name: 'SplashScreen'}],
    });
    setRefresh(2);
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        // console.log('----------', value);
        dispatch({type: RESTORE_TOKEN, payload: value});
      }
    });
  }, [refresh]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        Login,
        setLogout,
        Franchise,
        Inspection,
      }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
