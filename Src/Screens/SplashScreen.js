/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import colors from '../Utils/colors';
import metrics from '../Utils/metrics';
import images from '../Utils/images';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
const SplashScreen = props => {
  useEffect(() => {
    AsyncStorage.getItem('islogin').then(value => {
      setTimeout(() => {
        if (JSON.parse(value)) {
          props.navigation.replace('MainTabScreen');
        } else {
          props.navigation.navigate('SplashScreen');
        }
      }, 1600);
    });
  }, [props]);

  return (
    <View
      style={{
        flex: 1,
        height: metrics.HEIGHT * 1,
        position: 'relative',
        backgroundColor: '#e5e6e9',
      }}>
      <StatusBar backgroundColor={colors.themecolor} />

      <Animatable.View
        animation={'slideInDown'}
        duration={2000}
        // style={{
        //   height: '75%',
        //   backgroundColor: colors.themecolor,
        //   borderBottomLeftRadius: 400,
        //   borderBottomRightRadius: 400,
        //   width: metrics.WIDTH * 2,
        //   alignSelf: 'center',
        // }}
      >
        <LinearGradient
          colors={['#030C23', '#0F2F42', '#082E42']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            height: '80%',
            // backgroundColor: colors.themecolor,
            borderBottomLeftRadius: 400,
            borderBottomRightRadius: 400,
            width: metrics.WIDTH * 2,
            alignSelf: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',

              alignSelf: 'center',
              marginTop: metrics.HEIGHT * 0.05,
            }}>
            <Animatable.Image
              animation="flipInY"
              source={images.logo}
              style={{
                width: 250,
                height: 250,
              }}
              resizeMode="stretch"
            />
          </View>
          <View style={{padding: '0%', marginTop: '-8%'}}>
            {/* <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                color: colors.white,
                fontWeight: '400',
                marginTop: '-5%',
              }}>
              AUTO INSIGHTS
            </Text> */}
            <Text
              style={{
                // marginTop: '-5%',
                textAlign: 'center',
                fontSize: 14,
                color: colors.gary,
              }}>
              Full-service & Car Washes
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '300',
                marginTop: 30,
                color: colors.gary,
                width: metrics.WIDTH * 1,
                alignSelf: 'center',
              }}>
              Effortless Car Wash at Your Fingertips.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '300',
                color: colors.gary,
                width: metrics.WIDTH * 1,
                alignSelf: 'center',
              }}>
              {' '}
              Begin Here!
            </Text>
          </View>
        </LinearGradient>
      </Animatable.View>
      <Animatable.View
        animation={'fadeIn'}
        delay={1500}
        duration={500}
        style={{
          position: 'absolute',
          bottom: 270,
          alignSelf: 'center',
          elevation: 15,
        }}>
        <Animatable.View animation={'pulse'} iterationCount={'infinite'}>
          <View
            style={{
              height: metrics.HEIGHT * 0.12,
              width: metrics.WIDTH * 0.7,
              borderRadius: 50,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Animatable.View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.replace('LoginScreen');
          }}
          activeOpacity={0.7}>
          <LinearGradient
            colors={['#030C23', '#0F2F42', '#082E42']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              borderRadius: 340,
              padding: '5%',
              justifyContent: 'center',
              borderWidth: 0.4,
              alignSelf: 'center',
              borderColor: colors.white,
              marginHorizontal: '5%',
              elevation: 8,
              position: 'absolute',
              bottom: 20,
              // backgroundColor: colors.themecolor,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: colors.white,
                fontWeight: 'bold',
                paddingHorizontal: 38,
              }}>
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
