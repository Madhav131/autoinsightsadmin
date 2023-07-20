/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../../Utils/images';
import Navbar from '../../components/Navbar';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ACCEPT_HEADER, get_employee_inspection} from '../../Utils/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useUserContext} from '../../Context/user_context';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
  {
    id: 1,
    fname: 'Applified',
    tname: 'Digital Courtesy Check',
    Status: 'Pending',
  },
  {
    id: 2,
    fname: 'Applified',
    tname: 'Digital Courtesy Check1',
    Status: 'Completed',
  },
  {
    id: 3,
    fname: 'Applified',
    tname: 'Digital Courtesy Check1',
    Status: 'Pending',
  },
  {
    id: 4,
    fname: 'Applified',
    tname: 'Digital Courtesy Check',
    Status: 'Completed',
  },
  {
    id: 5,
    fname: 'Applified',
    tname: 'Digital Courtesy Check',
    Status: 'Pending',
  },
];

const Inspection = props => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {});
    inspecationlist();

    return unsubscribe;
  }, [props]);
  const {setLogout} = useUserContext();
  const [getinlist, SetInList] = useState([]);
  const [getload, SetLoad] = useState(false);

  const inspecationlist = async () => {
    SetLoad(true);
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(get_employee_inspection, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('inspecationlist', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.success === 1) {
          SetInList(res.data.data);
          SetLoad(false);
        } else {
          SetLoad(false);
        }
      })
      .catch(err => {
        console.log('err', err);
        SetLoad(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.whitesomke,
        // position: 'relative',
      }}>
      <StatusBar
        backgroundColor={colors.themecolor2}
        barStyle="light-content"
      />

      {/* <Navbar navigation={props.navigation} /> */}
      <View
        style={{
          backgroundColor: colors.themecolor2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          paddingTop: 16,
          paddingBottom: 10,
          marginTop: Platform.OS === 'ios' ? '10%' : null,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', left: '10%'}}
          onPress={() => props.navigation.openDrawer()}>
          <Image
            source={require('../../Assets/menu1.png')}
            style={{
              height: metrics.HEIGHT * 0.04,
              width: metrics.WIDTH * 0.09,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.white,
            fontSize: 25,
            fontWeight: '500',
            width: metrics.WIDTH * 0.6,
          }}>
          Inspections
        </Text>
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('AddInspection')}
          style={{
            backgroundColor: colors.white,
            width: 45,
            height: 45,
            borderRadius: 45,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            marginRight: 20,
            transform: [{translateY: -7}],
          }}>
          <Text style={{fontSize: 25, color: colors.themecolor}}>+</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddInspection')}>
          <AntDesign
            name="pluscircle"
            color={colors.white}
            size={40}
            style={{
              alignItems: 'center',
              marginRight: 20,
              justifyContent: 'center',
              marginBottom: '2%',
            }}
          />
        </TouchableOpacity>
      </View>

      {getload === true ? (
        <ActivityIndicator
          color={colors.themecolor}
          size="large"
          style={{
            justifyContent: 'center',
            flex: 1,
          }}
        />
      ) : (
        <View style={{paddingHorizontal: '2%', marginBottom: '5%'}}>
          <FlatList
            data={getinlist}
            style={{marginBottom: '15%'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Animatable.View>
                  <LinearGradient
                    colors={[
                      colors.themecolor,
                      colors.themecolor1,
                      colors.themecolor2,
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{
                      marginTop: '5%',
                      marginBottom: 5,
                      borderRadius: 8,
                      paddingHorizontal: '3%',
                      backgroundColor: colors.white,
                      elevation: 5,
                      // borderLeftWidth: 5,
                      // borderLeftColor:
                      //   item.status === 0
                      //     ? '#ff666e'
                      //     : item.status === 1
                      //     ? '#009933'
                      //     : null,
                    }}>
                    <View
                      style={{
                        // backgroundColor: 'black',
                        width: '70%',
                        padding: 15,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            width: metrics.WIDTH * 0.57,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 20,
                              fontWeight: '500',
                              padding: 2,
                            }}>
                            {item.franchises.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // width: '10%',
                          }}>
                          <Octicons
                            name="dot-fill"
                            size={20}
                            color={
                              item.status === 0
                                ? '#ff666e'
                                : item.status === 1
                                ? 'lightgreen'
                                : null
                            }
                          />
                          <Text
                            style={{
                              color:
                                item.status === 0
                                  ? 'lightpink'
                                  : item.status === 1
                                  ? 'lightgreen'
                                  : null,
                              fontSize: 16,
                              fontWeight: '500',
                              padding: 2,
                              marginLeft: 7,
                            }}>
                            {item.status === 0
                              ? 'PENDING'
                              : item.status === 1
                              ? 'COMPLETED'
                              : null}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          color: colors.gary,
                          fontSize: 14,
                          padding: 2,
                        }}>
                        {item.template.template_name}
                      </Text>
                      <Text
                        style={{
                          color: colors.gary,
                          fontSize: 14,
                          padding: 2,
                        }}>
                        {item.make} {item.model}
                      </Text>
                      <View
                        style={{
                          width: metrics.WIDTH * 0.83,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              marginTop: 10,
                              color: colors.white,
                              fontWeight: '600',
                              fontSize: 14,
                              padding: 2,
                            }}>
                            Customer Details
                          </Text>
                          <Text
                            style={{
                              color: colors.gary,
                              fontSize: 14,
                              padding: 2,
                            }}>
                            {item.customers.name} {item.customers.last_name}
                          </Text>
                          <Text
                            style={{
                              color: colors.gary,
                              fontSize: 14,
                              padding: 2,
                            }}>
                            {item.customers.email}
                          </Text>
                          <Text
                            style={{
                              color: colors.gary,
                              fontSize: 14,
                              padding: 2,
                            }}>
                            {item.customers.phone_no}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginBottom: 16,
                          }}>
                          {item.status === 0 ? (
                            <TouchableOpacity
                              onPress={() =>
                                props.navigation.replace('UpdateInspection', {
                                  data: item,
                                })
                              }
                              style={{
                                borderRadius: 13,
                                flexDirection: 'row',
                                backgroundColor: '#4788C7',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                marginBottom: 20,
                              }}>
                              <Text
                                style={{
                                  color: colors.white,
                                  fontWeight: '500',
                                  marginRight: 10,
                                }}>
                                EDIT
                              </Text>
                              <MaterialIcons
                                name="edit"
                                size={18}
                                color={colors.white}
                              />
                              {/* <FontAwesome
                          name="pencil"
                          color={colors.black}
                          size={25}
                        /> */}
                              {/* <Image
                          source={require('../../Assets/edit.gif')}
                          style={{width: 30, height: 50}}
                          resizeMode="contain"
                        /> */}
                            </TouchableOpacity>
                          ) : item.status === 1 ? null : null}

                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.replace('ViewInSpection', {
                                data: item,
                              })
                            }
                            style={{
                              borderRadius: 13,
                              flexDirection: 'row',
                              backgroundColor: '#4788C7',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingHorizontal: 15,
                              paddingVertical: 10,
                            }}>
                            <Text
                              style={{
                                color: colors.white,
                                fontWeight: '500',
                                marginRight: 10,
                              }}>
                              VIEW
                            </Text>
                            <MaterialIcons
                              name="remove-red-eye"
                              size={18}
                              color={colors.white}
                            />
                            {/* <Image
                        source={require('../../Assets/show.gif')}
                        style={{width: 30, height: 50}}
                        resizeMode="contain"
                      /> */}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </Animatable.View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
export default Inspection;
