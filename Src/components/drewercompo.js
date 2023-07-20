/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../Utils/colors';
import metrics from '../Utils/metrics';
import images from '../Utils/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useUserContext} from '../Context/user_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const Drewerscreen = props => {
  const {setLogout} = useUserContext();
  const logout = props => {
    props.navigation.closeDrawer();
    AsyncStorage.clear();

    setLogout(props);
  };

  const [getdata, SetData] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userinfo').then(value => {
      // console.log('eee', value);
      if (value) {
        SetData(JSON.parse(value));
      }
    });
  }, [props]);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.white}}>
        <View>
          <LinearGradient
            colors={[colors.themecolor, colors.themecolor1, colors.themecolor2]}
            start={{x: 0, y: 0}}
            end={{x: 2, y: 1}}>
            {/* <ImageBackground
          source={images.profile}
          style={{
            width: 130,
            height: 80,
           marginTop:20
            // backgroundColor: 'red',
            // marginTop: '-20%',
          }}
          resizeMode="contain"></ImageBackground> */}
            <View style={{marginLeft: 20}}>
              <Ionicons
                name="person-circle-sharp"
                color={colors.white}
                size={70}
                style={{marginTop: Platform.OS === 'ios' ? 30 : 20}}
              />
              <Text
                style={{
                  color: colors.white,
                  fontSize: 22,
                  marginLeft: 8,
                  marginTop: 10,
                  fontWeight: '700',
                }}>
                {getdata.name} {getdata.last_name}
              </Text>
              <Text
                style={{
                  color: colors.whitesomke,
                  marginLeft: 8,
                  marginTop: 5,
                  marginBottom: 30,
                  fontWeight: '600',
                }}>
                {getdata.email}
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: colors.white,
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() => logout(props)}
            style={{
              marginTop: metrics.HEIGHT * 0.015,
              padding: '5%',

              flexDirection: 'row',
              width: '100%',
              // elevation: 8,
            }}>
            <MaterialCommunityIcons
              name="logout"
              size={25}
              color={colors.textgrey}
              style={{marginRight: 15}}
            />
            <View
              style={{
                justifyContent: 'center',
                width: '80%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 15,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Logout
              </Text>
            </View>
            <View style={{width: '10%', justifyContent: 'center'}}>
              {/* <Fontisto name="angle-right" color={colors.themecolor} size={20} /> */}
            </View>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            alignItems: 'flex-end',
            marginHorizontal: '8%',
            top: '5%',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}>
            <FontAwesome name="close" size={30} color={colors.themecolor} />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={images.profile}
          style={{
            width: 200,
            height: 150,
            alignItems: 'center',
            alignSelf: 'center',
            // backgroundColor: 'red',
            // marginTop: '-20%',
          }}
          resizeMode="contain"></ImageBackground>
        <TouchableOpacity
          // onPress={() => props.navigation.replace('SplashScreen')}
          onPress={() => logout(props)}
          style={{
            alignItems: 'center',
            padding: '3%',
            backgroundColor: colors.themecolor,
            //   width: '30%',
            alignSelf: 'center',
            // marginTop: metrics.HEIGHT * 0.24,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontStyle: 'italic',
            }}>
            LOGOUT
          </Text>
        </TouchableOpacity> */}
        {/* <Animatable.View animation="bounceInLeft" duration={100}> */}
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('Inspection');
          }}
          style={{
            marginTop: metrics.HEIGHT * 0.03,
            padding: '5%',
            borderStyle: 'dashed',
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            flexDirection: 'row',
            width: '100%',
            elevation: 8,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../Assets/survey.gif')}
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
          <View
            style={{
              justifyContent: 'center',
              width: '80%',
            }}>
            <Text
              style={{
                color: colors.themecolor,
                fontSize: 18,

                fontWeight: 'bold',
              }}>
              Inspection
            </Text>
          </View>
          <View style={{width: '10%', justifyContent: 'center'}}>
            <Fontisto name="angle-right" color={colors.themecolor} size={20} />
          </View>
        </TouchableOpacity> */}
        {/* </Animatable.View> */}
      </ScrollView>
    </View>
  );
};

export default Drewerscreen;

const styles = StyleSheet.create({});
