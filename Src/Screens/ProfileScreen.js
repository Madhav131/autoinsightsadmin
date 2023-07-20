/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../Utils/colors';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import {windowWidth} from '../Utils/Dimensions';
import Carousel from 'react-native-snap-carousel';
import metrics from '../Utils/metrics';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useUserContext} from '../Context/user_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
const ProfileScreen = props => {
  const {setLogout} = useUserContext();
  const logout = props => {
    AsyncStorage.clear();
    setLogout(props);
  };

  const [getdata, SetData] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userinfo').then(value => {
      if (value) {
        SetData(JSON.parse(value));
      }
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        backgroundColor={colors.themecolor1}
        barStyle="light-content"
      />
      {/* <Navbar navigation={props.navigation} /> */}
      <LinearGradient
        colors={[colors.themecolor, colors.themecolor1, colors.themecolor2]}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 1}}
        style={{
          flex: 0.3,
          width: metrics.WIDTH * 1.2,
          backgroundColor: colors.themecolor,
          borderBottomLeftRadius: 600,
          borderBottomRightRadius: 600,
          elevation: 5,
          paddingHorizontal: 220,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          flex: 0.8,
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: colors.white,
            transform: [{translateY: -50}],
            alignSelf: 'center',
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
          }}>
          <Image
            source={require('../Assets/profile.png')}
            style={{width: 95, height: 95, borderRadius: 95}}
            resizeMode="contain"
          />
        </View>
        <View style={{marginTop: 130}}>
          <LinearGradient
            colors={[colors.themecolor, colors.themecolor1, colors.themecolor2]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 1}}
            style={{
              flexDirection: 'row',
              marginHorizontal: '2%',
              padding: 5,
              borderRadius: 20,

              paddingHorizontal: 30,
              alignItems: 'center',
            }}>
            <Octicons
              name="person"
              size={26}
              color={colors.white}
              style={{marginRight: 20, width: '10%'}}
            />
            <Text
              style={{
                top: 5,
                color: colors.white,
                fontSize: 18,
                fontWeight: '400',
                marginBottom: 15,
              }}>
              {getdata.name} {getdata.last_name}
            </Text>
          </LinearGradient>
          {/* <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.7,
              borderBottomColor: colors.textgrey,
              paddingHorizontal: 30,
              marginTop: 20,
            }}>
            <MaterialIcons
              name="phone"
              size={26}
              color={colors.themecolor}
              style={{marginRight: 20, width: '10%'}}
            />
            <Text
              style={{
                color: colors.black,
                fontSize: 18,
                fontWeight: '400',
                marginBottom: 15,
              }}>
              {getdata.phone_no}
            </Text>
          </View> */}
          <LinearGradient
            colors={[colors.themecolor, colors.themecolor1, colors.themecolor2]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 1}}
            style={{
              flexDirection: 'row',
              marginHorizontal: '2%',
              padding: 5,
              borderRadius: 20,
              marginTop: 5,
              paddingHorizontal: 30,
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="alternate-email"
              size={26}
              color={colors.white}
              style={{marginRight: 20, width: '10%'}}
            />
            <Text
              style={{
                top: 5,
                color: colors.white,
                fontSize: 18,
                fontWeight: '400',
                marginBottom: 15,
              }}>
              {getdata.email}
            </Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => {
              // props.navigation.replace('SplashScreen');
              logout(props);
            }}>
            <LinearGradient
              colors={[
                colors.themecolor,
                colors.themecolor1,
                colors.themecolor2,
              ]}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 1}}
              style={{
                flexDirection: 'row',
                marginHorizontal: '2%',
                padding: 5,
                borderRadius: 20,
                marginTop: metrics.HEIGHT * 0.09,
                width: '55%',
                paddingHorizontal: 30,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="logout"
                size={26}
                color={colors.white}
                style={{marginRight: 20}}
              />
              <Text
                style={{
                  top: 5,
                  color: colors.white,
                  fontSize: 18,

                  marginBottom: 15,
                }}>
                Logout
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            marginTop: '5%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              // props.navigation.replace('SplashScreen');
              logout(props);
            }}
            style={{
              backgroundColor: colors.themecolor,
              borderRadius: 20,
              padding: '5%',
            }}>
            <Text style={{ color: colors.white }}>LOGOUT</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default ProfileScreen;
