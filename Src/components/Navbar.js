/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../Utils/colors';
import metrics from '../Utils/metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../Utils/images';

import LinearGradient from 'react-native-linear-gradient';

const Navbar = props => {
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {});
  //   Userdetails();
  //   return unsubscribe;
  // }, [props]);
  return (
    <View>
      <LinearGradient
        colors={[colors.themecolor, colors.themecolor1, colors.themecolor2]}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 1}}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: '2%',
          paddingVertical: metrics.HEIGHT * 0.01,
          marginTop: Platform.OS === 'ios' ? '10%' : 0,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', left: '10%'}}
          onPress={() => props.navigation.openDrawer()}>
          <Image
            source={require('../Assets/menu.png')}
            style={{
              height: metrics.HEIGHT * 0.04,
              width: metrics.WIDTH * 0.09,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
          }}
        />
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={images.profile}
            style={{width: 80, height: 50}}
            resizeMode="contain"
          />
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={{alignItems: 'center'}}
          //   onPress={() => props.navigation.openDrawer()}
        >
          <MaterialIcons
            name="account-circle"
            size={30}
            color={colors.themecolor}
          />
        </TouchableOpacity> */}
      </LinearGradient>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
