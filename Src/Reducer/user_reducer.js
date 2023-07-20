import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  RESTORE_TOKEN,
  DASHBOARD_BEGIN,
  DASHBOARD_SUCCESS,
  DASHBOARD_ERROR,
  RESTORE_ROLE,
  FRANCHISE_BEGIN,
  FRANCHISE_SUCCESS,
  FRANCHISE_ERROR,
  INSPECTION_BEGIN,
  INSPECTION_SUCCESS,
  INSPECTION_ERROR,
} from '../Utils/action';

const user_reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {...state, login_loading: true};
    case LOGIN_SUCCESS:
      return {...state, login_loading: false, userinfo: action.payload.record};
    case LOGIN_ERROR:
      return {...state, login_loading: false};
    case RESTORE_TOKEN:
      return {...state, token: action.payload};
    case FRANCHISE_BEGIN:
      return {...state, franchise_loding: true};
    case FRANCHISE_SUCCESS:
      return {
        ...state,
        franchise_loding: false,
        franchise_array: action.payload.data,
      };
    case FRANCHISE_ERROR:
      return {...state, franchise_loding: false};
    case INSPECTION_BEGIN:
      return {...state, inspection_loding: true};
    case INSPECTION_SUCCESS:
      return {
        ...state,
        inspection_loding: false,
        inspection_data: action.payload.data,
      };
    case INSPECTION_ERROR:
      return {...state, inspection_loding: false};
    case LOGOUT_USER:
      AsyncStorage.clear();
      return {
        ...state,
        token: '',
        userinfo: '',
        role: '',
      };
  }
  return state;
};
export default user_reducer;
