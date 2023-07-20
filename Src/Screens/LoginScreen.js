/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import colors from '../Utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import fonts from '../Utils/fonts';
import metrics from '../Utils/metrics';
import {useUserContext} from '../Context/user_context';
import Toast from 'react-native-simple-toast';
import {TextInput, DefaultTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = props => {
  const [getemail, SetEmail] = useState('');
  const [getpass, SetPass] = useState('');

  const {Login, login_loading} = useUserContext();
  const email_validation =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const Submit = () => {
    if (getemail === '') {
      Toast.show('Enter Email');
    } else if (email_validation.test(getemail) === false) {
      Toast.show('Enter valid Email');
    } else if (getpass === '') {
      Toast.show('Enter password');
    } else {
      const formdata = new FormData();
      formdata.append('email', getemail);
      formdata.append('password', getpass);
      Login(formdata, props);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
          <View
            style={{
              backgroundColor: colors.white,
              height: metrics.HEIGHT * 1.02,
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                alignItems: 'center',
                justifyContent: 'center',
                height: '35%',
              }}>
              <Image
                source={require('../Assets/Car.gif')}
                style={{width: 300, height: 300}}
                resizeMode="contain"
              />
            </View>

            <Animatable.View animation="slideInUp">
              <LinearGradient
                colors={['#030C23', '#0F2F42', '#082E42']}
                start={{x: 1, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  marginTop: 20,
                  marginHorizontal: '2%',
                  borderRadius: 5,
                  width: metrics.WIDTH * 2,
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 400,
                  borderTopRightRadius: 400,
                  backgroundColor: colors.themecolor,
                  height: '90%',
                }}>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginTop: 60,
                    width: metrics.WIDTH * 0.9,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 22,
                      fontWeight: '700',
                      // fontStyle: 'italic',
                      textAlign: 'center',
                      // textDecorationLine: 'underline',
                    }}>
                    Welcome To Autoinsights Admin
                  </Text>
                  {/* <Text
                style={{
                  marginTop: metrics.HEIGHT * 0.06,
                  fontSize: 16,
                  color: colors.white,
                  fontWeight: '500',
                }}>
                Email Address:-
              </Text> */}
                  <View
                    style={{
                      marginTop: metrics.HEIGHT * 0.09,
                      // marginHorizontal: '5%',

                      height: metrics.HEIGHT * 0.06,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 10,
                    }}>
                    <TextInput
                      mode="flat"
                      theme={{
                        colors: {
                          onSurfaceVariant: 'white',
                        },
                      }}
                      textColor={colors.white}
                      contentStyle={{backgroundColor: colors.themecolor2}}
                      label={'Email'}
                      underlineColor={colors.white}
                      activeUnderlineColor={colors.white}
                      underlineStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.white,
                        width: metrics.WIDTH * 0.8,
                      }}
                      placeholderTextColor={colors.white}
                      selectionColor={colors.white}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={{
                        fontSize: 16,
                        color: colors.white,
                        // color: '#000',
                        fontWeight: '600',
                        width: metrics.WIDTH * 0.7,
                      }}
                      onChangeText={text => SetEmail(text)}
                    />
                    <View style={{marginLeft: metrics.WIDTH * 0.02}}>
                      <MaterialIcons
                        name="email"
                        size={25}
                        color={colors.white}
                      />
                    </View>
                  </View>
                  {/* <Text
                style={{
                  marginTop: metrics.HEIGHT * 0.03,
                  fontSize: 16,
                  color: colors.white,
                  fontWeight: '500',
                }}>
                Password:-
              </Text> */}
                  <View
                    style={{
                      marginTop: metrics.HEIGHT * 0.04,
                      // marginHorizontal: '2%',

                      height: metrics.HEIGHT * 0.06,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      mode="flat"
                      textColor={colors.white}
                      theme={{
                        colors: {
                          onSurfaceVariant: 'white',
                        },
                      }}
                      contentStyle={{backgroundColor: colors.themecolor2}}
                      label={'Password'}
                      underlineColor={colors.white}
                      activeUnderlineColor={colors.white}
                      underlineStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.white,
                        width: metrics.WIDTH * 0.8,
                      }}
                      placeholderTextColor={colors.white}
                      selectionColor={colors.white}
                      keyboardType="default"
                      // autoCapitalize="none"s
                      style={{
                        fontSize: 16,
                        color: colors.white,
                        // color: '#000',
                        fontWeight: '600',
                        marginLeft: metrics.WIDTH * 0.02,
                        width: metrics.WIDTH * 0.7,
                      }}
                      onChangeText={text => SetPass(text)}
                    />
                    <View style={{marginLeft: metrics.WIDTH * 0.02}}>
                      <MaterialIcons
                        name="lock"
                        size={25}
                        color={colors.white}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    // onPress={() => props.navigation.navigate('MainTabScreen')}
                    onPress={() => Submit()}
                    activeOpacity={0.7}
                    disabled={login_loading === true ? true : false}
                    style={{
                      marginTop: metrics.HEIGHT * 0.09,
                      alignItems: 'center',
                      borderRadius: 30,
                      justifyContent: 'center',
                      backgroundColor: colors.white,
                      height: metrics.HEIGHT * 0.07,
                      flexDirection: 'row',
                      width: '60%',
                      alignSelf: 'center',
                      marginBottom: '4%',
                    }}>
                    {login_loading === true ? (
                      <ActivityIndicator
                        color={colors.lightblue}
                        size="small"
                      />
                    ) : (
                      <>
                        <Text
                          style={{
                            color: colors.themecolor,
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginRight: 20,
                          }}>
                          LOG IN
                        </Text>
                        <AntDesign
                          name="right"
                          color={colors.themecolor}
                          size={20}
                          style={{left: '5%'}}
                        />
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animatable.View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
