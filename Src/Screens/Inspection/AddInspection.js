/* eslint-disable no-lone-blocks */
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
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../Utils/images';
import * as Animatable from 'react-native-animatable';
import {Dropdown} from 'react-native-element-dropdown';
import RNModal from 'react-native-modal';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {
  ACCEPT_HEADER,
  add_inspection,
  get_customer,
  get_templates,
  get_vin,
} from '../../Utils/baseurl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useUserContext} from '../../Context/user_context';
import * as Progress from 'react-native-progress';
import {create} from 'react-test-renderer';
import LinearGradient from 'react-native-linear-gradient';

const AddInspection = props => {
  const [getpicus, SetPiCus] = useState('');
  const [getpicustype, SetPiCusTyp] = useState('');
  const [getpitemp, SetPiTemp] = useState('');
  const [getpitman, SetPiMan] = useState('');
  const [getpitmechi, SetPiMechi] = useState('');
  const [getupload, setupload] = useState(0);
  const [createchildmodel, setcreatechildmodel] = useState(false);
  const [getcolor, SetColor] = useState('');
  const [getcus_array, SetCus_Array] = useState([]);
  const [gettmp_array, SetTmp_Array] = useState([]);
  const [getronumber, SetRoNumber] = useState('');
  const [getodokm, SetOdoKm] = useState('');
  const [getinnote, SetInNote] = useState('');
  const [getpartreq, SetPartReq] = useState('');
  const [getvin, SetVin] = useState('');
  const [getvinload, SetVinLoad] = useState(false);
  const [getvindata, SetVinData] = useState('');
  const [getlice, SetLiec] = useState('');
  const [getvenote, SetVeNote] = useState('');
  const [getviewlist, SetViewList] = useState(false);
  const [progress, setProgress] = useState(0); // Initialize progress state
  const [p1, SetP1] = useState(false);
  const [p2, SetP2] = useState(false);
  const [p3, SetP3] = useState(false);
  const [red, setred] = useState(false);
  const [i1, setI1] = useState(false);
  const [i2, setI2] = useState(false);
  const [i3, setI3] = useState(false);
  const [i4, setI4] = useState(false);
  const [i5, setI5] = useState(false);
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);
  const [v3, setV3] = useState(false);
  const [v4, setV4] = useState(false);
  const [aview, SetView] = useState(false);

  const btn = [
    {
      id: 1,
      text1: '1',
      text2: 'Customer',
      text3: '1',
      completed: p1,
    },
    {
      id: 2,
      text1: '2',
      text2: 'Vehicle',
      text3: '2',
      completed: p2,
    },
    {
      id: 3,
      text1: '3',
      text2: 'Inspection',
      text3: '3',
      completed: p3,
    },
  ];

  const Cus_Type = [
    {id: 1, name: 'Individual'},
    {id: 2, name: 'Org'},
    {id: 3, name: 'Fleet'},
    {id: 4, name: 'Advanced'},
  ];

  const manager = [
    {id: 1, name: 'Abc'},
    {id: 2, name: 'xyz'},
    {id: 3, name: 'Def'},
  ];

  const mechanic = [
    {id: 1, name: '123'},
    {id: 2, name: '456'},
    {id: 3, name: '789'},
    {id: 4, name: '012'},
  ];
  const handleNextForm = () => {
    // Update the progress value based on the current form
    setProgress(progress + 0.48);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {});
    GetCustomer();
    Gettemplates();

    return unsubscribe;
  }, [props]);
  const {setLogout} = useUserContext();

  const GetCustomer = async () => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(get_customer, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.success == 1) {
          SetCus_Array(res.data.data);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const Gettemplates = async () => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(get_templates, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        SetTmp_Array(res.data.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const GetVin = async () => {
    var Token = await AsyncStorage.getItem('token');
    if (getvin === '') {
      Toast.show('Enter Vin...!!!');
    } else {
      SetVinLoad(true);
      const fromdata = new FormData();
      fromdata.append('vin', getvin);
      axios
        .post(get_vin, fromdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: 'Bearer ' + Token,
          },
        })
        .then(res => {
          console.log(JSON.stringify(res.data, null, 2));
          if (res.data.data.success === '1') {
            // console.log('res', res.data.data.attributes);
            SetVinData(res.data.data.attributes);
            SetViewList(true);
            SetVinLoad(false);
            SetView(true);
            console.log('vin done');
          } else {
            console.log('vin un');
            Toast.show('Invalid Vin...!!');
            SetVinLoad(false);
            SetViewList(false);
          }
        })
        .catch(err => {
          console.log('err11', err);
          SetVinLoad(false);
          SetViewList(false);
        });
    }
  };

  const [isloading, SetLoading] = useState(false);

  const Add_Inspection = async () => {
    setI1(false);
    setI2(false);
    setI3(false);
    setI4(false);
    setI5(false);

    {
      getpitemp === '' ? setI1(true) : null;
    }
    {
      getronumber === '' ? setI2(true) : null;
    }
    {
      getodokm === '' ? setI3(true) : null;
    }
    {
      getinnote === '' ? setI4(true) : null;
    }
    {
      getpartreq === '' ? setI5(true) : null;
    }
    if (getpitemp === '') {
      Toast.show('Select Templates..!!!');
    } else if (getronumber === '') {
      Toast.show('Enter RO Number..!!!');
    } else if (getodokm === '') {
      Toast.show('Enter Odometer(km)..!!!');
    } else if (getinnote === '') {
      Toast.show('Enter Inspection Note..!!!');
    } else if (getpartreq === '') {
      Toast.show('Enter Part Requisition..!!!');
    } else {
      handleNextForm();
      SetLoading(true);
      var Token = await AsyncStorage.getItem('token');
      const fromdata = new FormData();
      fromdata.append('template_id', getpitemp.id);
      fromdata.append('ro_no', getronumber);
      fromdata.append('odometer', getodokm);
      fromdata.append('inspection_note', getinnote);
      fromdata.append('parts_requisition', getpartreq);
      fromdata.append('year', getvindata.Year);
      fromdata.append('make', getvindata.Make);
      fromdata.append('model', getvindata.Model);
      fromdata.append('vin', getvin);
      fromdata.append('license_plate', getlice);
      fromdata.append('vehicle_color', getcolor);
      fromdata.append('vehicle_note', getvenote);
      fromdata.append('name', getpicus.id);
      fromdata.append('last_name', getpicus.last_name);
      fromdata.append('email', getpicus.email);
      fromdata.append('phone_no', getpicus.phone_no);
      fromdata.append('contact_preference', getpicus.contact_preference);
      fromdata.append('note', getpicus.note);
      console.log('fromdata->', fromdata);
      axios
        .post(add_inspection, fromdata, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: 'Bearer ' + Token,
          },
        })
        .then(res => {
          console.log('respone', res.data);
          if (res.data.success == 1) {
            Toast.show('success..!!!');
            props.navigation.goBack(null);
            SetLoading(false);
          } else {
            SetLoading(false);
          }
        })
        .catch(err => {
          console.log('err', err);
          SetLoading(false);
        });
    }
  };

  const fristscreen = () => {
    if (getpicus === '') {
      setred(true);
      Toast.show('Select Customer..!!!');
    } else {
      setupload(1);
      SetP1(true);
      handleNextForm();
    }
  };

  const nextscreen = () => {
    setV1(false);
    setV2(false);
    setV3(false);
    setV4(false);
    {
      getvin === '' ? setV1(true) : null;
    }
    {
      getlice === '' ? setV2(true) : null;
    }
    {
      getvenote === '' ? setV3(true) : null;
    }
    {
      getcolor === '' ? setV4(true) : null;
    }
    if (getvin === '') {
      Toast.show('Enter VIN..!!!');
    } else if (getlice === '') {
      Toast.show('Enter License Plate..!!!');
    } else if (getvenote === '') {
      Toast.show('Select Color..!!!');
    } else if (getcolor === '') {
      Toast.show('Enter Vehicle Note..!!!');
    } else {
      setupload(2);
      SetP2(true);
      handleNextForm();
    }
  };

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: colors.white,
    //     // position: 'relative',
    //   }}>
    <LinearGradient
      colors={[colors.themecolor, colors.themecolor1, colors.themecolor2]}
      start={{x: 0, y: 0.5}}
      end={{x: 0, y: 0}}
      style={{
        flex: 1,
        // backgroundColor: colors.white,
        // position: 'relative',
      }}>
      <StatusBar
        backgroundColor={colors.themecolor1}
        barStyle="light-content"
      />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: '2%',
          paddingVertical: metrics.HEIGHT * 0.01,
          // backgroundColor: colors.themecolo,
          marginTop: Platform.OS === 'ios' ? '10%' : 0,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', left: '10%', marginTop: 10}}
          onPress={() => props.navigation.goBack(null)}>
          <Ionicons name="arrow-back" size={35} color={colors.white} />
        </TouchableOpacity>
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
      </View>
      <View>
        <View style={{transform: [{translateY: 22.5}]}}>
          <Progress.Bar
            progress={progress}
            width={metrics.WIDTH * 0.7}
            height={3}
            borderColor="#bdc3c7"
            color={colors.white}
            borderRadius={5}
            unfilledColor="#bdc3c7"
            style={{alignSelf: 'center'}}
          />
        </View>
        <FlatList
          data={btn}
          listKey={(item, index) => 'U' + index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '2%',
                  width: metrics.WIDTH * 0.33,
                  // height: metrics.HEIGHT * 0.04,
                  justifyContent: 'space-around',
                }}>
                <View
                // onPress={() => {
                //   selected_media_list.length > 0 ? setupload(index) : null;
                // }}
                // onPress={() => {
                //   getupload === 0
                //     ? fristscreen()
                //     : getupload === 1
                //     ? nextscreen()
                //     : setupload(index);
                // }}
                >
                  {getupload === index ? (
                    <View
                      style={{
                        backgroundColor: '#BEBEBE',
                        height: 22,
                        width: 22,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 22,
                      }}
                    />
                  ) : (
                    <View
                      style={[
                        {
                          backgroundColor: '#BEBEBE',
                          height: 22,
                          width: 22,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          borderRadius: 22,
                        },
                        item.completed
                          ? {backgroundColor: colors.white}
                          : {backgroundColor: '#BEBEBE'},
                      ]}>
                      {item.completed ? (
                        <MaterialIcons
                          name="done"
                          color={colors.blue}
                          size={18}
                          style={{alignSelf: 'center'}}
                        />
                      ) : null}
                    </View>
                  )}
                  {getupload === index ? (
                    <View>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '700',
                          fontSize: 13,
                        }}>
                        {item.text2}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          color: colors.gary,
                          fontWeight: '700',
                          fontSize: 13,
                        }}>
                        {item.text2}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
          numColumns={3}
        />
      </View>
      {getupload == 0 ? (
        <ScrollView>
          <View
            style={{
              paddingTop: metrics.HEIGHT * 0.05,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontWeight: '500',
              }}>
              Customer Details
            </Text>
            {/*  First Name */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                First Name<Text style={{color: 'red'}}>*</Text>
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.05,
                borderRadius: 8,
                borderColor: red ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                paddingTop: metrics.HEIGHT * 0.01,
                paddingBottom: metrics.HEIGHT * 0.01,
                backgroundColor: colors.white,
              }}>
              <Dropdown
                data={getcus_array}
                value={getpicus}
                placeholder="Select Customer"
                labelField="name"
                valueField="id"
                itemTextStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                inputSearchStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginHorizontal: '2%',
                }}
                placeholderStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#c0bfbf',
                  paddingHorizontal: 5,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginLeft: 4,
                }}
                onChange={(itemValue, itemIndex) => {
                  SetPiCus(itemValue);
                }}
              />
            </View>

            {/*  First Name */}
            {/*  Last Name */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Last Name
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: red ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor={'#c0bfbf'}
                value={getpicus.last_name}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
              />
              {/* <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  paddingLeft: '2%',
                }}>
                {getpicus.last_name}
              </Text> */}
            </View>
            {/*  Last Name */}
            {/* Email*/}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Email
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: red ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#c0bfbf'}
                value={getpicus.email}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
              />
              {/* <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  paddingLeft: '2%',
                }}>
                {getpicus.email}
              </Text> */}
            </View>
            {/* Email*/}
            {/* Phone Number*/}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Phone Number
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: red ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Phone No"
                placeholderTextColor={'#c0bfbf'}
                value={getpicus.phone_no}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
              />
            </View>
            {/* Phone Number*/}
            {/* Contact Preference*/}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Contact Preference
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: red ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Contact Preferance"
                value={getpicus.contact_preference}
                placeholderTextColor={'#c0bfbf'}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
              />
            </View>
            {/* Contact Preference*/}
            {/* Customer Note*/}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Customer Note
              </Text>
            </View> */}

            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: red ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Customer Note"
                placeholderTextColor={'#c0bfbf'}
                value={getpicus.note}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
              />
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: '700',
                  // marginHorizontal: '2%',
                }}>
                Customer Type
              </Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: '#cccbcb',
                borderWidth: 0.8,
                paddingTop: metrics.HEIGHT * 0.01,
                paddingBottom: metrics.HEIGHT * 0.01,
                backgroundColor: colors.white,
              }}>
              <Dropdown
                data={Cus_Type}
                dropdownPosition="auto"
                value={getpicustype}
                placeholder="Select Customer Type"
                labelField="name"
                valueField="id"
                itemTextStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                inputSearchStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginHorizontal: '2%',
                }}
                placeholderStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#c0bfbf',
                  paddingHorizontal: 5,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginLeft: 4,
                }}
                onChange={(itemValue, itemIndex) => {
                  SetPiCusTyp(itemValue);
                }}
              />
            </View>
            {/* Customer Note*/}
            <TouchableOpacity
              onPress={() => {
                fristscreen();
              }}>
              <LinearGradient
                colors={[
                  colors.themecolor,
                  colors.themecolor1,
                  colors.themecolor2,
                ]}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  marginTop: metrics.HEIGHT * 0.05,
                  alignItems: 'center',

                  borderRadius: 8,

                  height: metrics.HEIGHT * 0.067,
                  borderWidth: 0.4,
                  borderColor: colors.gary,
                  marginBottom: '4%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Next
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      {getupload == 2 ? (
        <ScrollView>
          <View
            style={{
              paddingTop: metrics.HEIGHT * 0.05,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontWeight: '500',
              }}>
              Inspection Details
            </Text>
            {/*  Inspection Template */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.04,
              }}>
              <Text
                style={{
                  color: colors.gary,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Inspection Template<Text style={{color: 'red'}}>*</Text>
              </Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                borderRadius: 8,
                borderColor: i1 ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                paddingTop: metrics.HEIGHT * 0.01,
                paddingBottom: metrics.HEIGHT * 0.01,
                backgroundColor: colors.white,
              }}>
              <Dropdown
                data={gettmp_array}
                value={getpitemp}
                placeholder="Select Templates"
                labelField="template_name"
                valueField="id"
                itemTextStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                inputSearchStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginHorizontal: '2%',
                }}
                placeholderStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#c0bfbf',
                  paddingHorizontal: 5,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginLeft: 4,
                }}
                onChange={(itemValue, itemIndex) => {
                  SetPiTemp(itemValue);
                }}
              />
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
              }}>
              <Text
                style={{
                  color: colors.gary,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Manager
              </Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                borderRadius: 8,
                borderColor: i1 ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                paddingTop: metrics.HEIGHT * 0.01,
                paddingBottom: metrics.HEIGHT * 0.01,
                backgroundColor: colors.white,
              }}>
              <Dropdown
                data={manager}
                value={getpitman}
                placeholder="Select Manager"
                labelField="name"
                valueField="id"
                itemTextStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                inputSearchStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginHorizontal: '2%',
                }}
                placeholderStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#c0bfbf',
                  paddingHorizontal: 5,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginLeft: 4,
                }}
                onChange={(itemValue, itemIndex) => {
                  SetPiMan(itemValue);
                }}
              />
            </View>

            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
              }}>
              <Text
                style={{
                  color: colors.gary,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Mechanic<Text style={{color: 'red'}}>*</Text>
              </Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                borderRadius: 8,
                borderColor: i1 ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                paddingTop: metrics.HEIGHT * 0.01,
                paddingBottom: metrics.HEIGHT * 0.01,
                backgroundColor: colors.white,
              }}>
              <Dropdown
                data={mechanic}
                value={getpitmechi}
                placeholder="Select Mechanic"
                labelField="name"
                valueField="id"
                itemTextStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                inputSearchStyle={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '600',
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginHorizontal: '2%',
                }}
                placeholderStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#c0bfbf',
                  paddingHorizontal: 5,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.black,
                  marginLeft: 4,
                }}
                onChange={(itemValue, itemIndex) => {
                  SetPiMechi(itemValue);
                }}
              />
            </View>

            {/*  Inspection Template */}
            {/*  RO Number */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                RO Number
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: i2 ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Enter RO Number"
                placeholderTextColor={'#c0bfbf'}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
                value={getronumber}
                onChangeText={val => {
                  SetRoNumber(val);
                }}
              />
            </View>
            {/* RO Number */}
            {/* Odometer (Km) */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Odometer (Km)
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: i3 ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Enter Odometer (Km)"
                placeholderTextColor={'#c0bfbf'}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
                onChangeText={val => {
                  SetOdoKm(val);
                }}
                value={getodokm}
              />
            </View>
            {/* Odometer (Km)*/}
            {/* Inspection Note */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Inspection Note
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: i4 ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Enter Inspection Note"
                placeholderTextColor={'#c0bfbf'}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
                multiline={true}
                onChangeText={val => {
                  SetInNote(val);
                }}
                value={getinnote}
              />
            </View>
            {/* Inspection Note*/}
            {/* Parts Requisition */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Parts Requisition
              </Text>
            </View> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                borderRadius: 8,
                borderColor: i5 ? 'red' : '#cccbcb',
                borderWidth: 0.8,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Enter Parts Requisition"
                placeholderTextColor={'#c0bfbf'}
                style={{
                  color: colors.black,
                  paddingHorizontal: 12,
                  fontSize: 14,
                  fontWeight: '600',
                  paddingVertical: 13,
                }}
                onChangeText={val => {
                  SetPartReq(val);
                }}
                value={getpartreq}
              />
            </View>
            {/* Parts Requisition*/}
            <TouchableOpacity onPress={() => Add_Inspection()}>
              <LinearGradient
                colors={[
                  colors.themecolor,
                  colors.themecolor1,
                  colors.themecolor2,
                ]}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  marginTop: metrics.HEIGHT * 0.04,
                  alignItems: 'center',
                  borderRadius: 8,
                  borderWidth: 0.4,
                  borderColor: colors.gary,
                  // backgroundColor: colors.themecolor,
                  height: metrics.HEIGHT * 0.067,
                  marginBottom: '4%',
                  justifyContent: 'center',
                }}>
                {isloading === true ? (
                  <ActivityIndicator color={colors.white} size="small" />
                ) : (
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: '600',
                    }}>
                    Submit
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      {getupload == 1 ? (
        <ScrollView>
          <View
            style={{
              paddingTop: metrics.HEIGHT * 0.05,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontWeight: '500',
              }}>
              Vehical Details
            </Text>
            {/*  VIN */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                VIN
              </Text>
            </View> */}
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginTop: metrics.HEIGHT * 0.04,
                  borderRadius: 8,
                  width: metrics.WIDTH * 0.73,
                  borderColor: v1 ? 'red' : '#cccbcb',
                  borderWidth: 0.8,
                  backgroundColor: colors.white,
                }}>
                <TextInput
                  placeholder="Enter VIN"
                  placeholderTextColor={'#c0bfbf'}
                  style={{
                    color: colors.black,
                    paddingHorizontal: 12,
                    fontSize: 14,
                    fontWeight: '600',
                    paddingVertical: 13,
                  }}
                  onChangeText={val => {
                    SetVin(val);
                  }}
                />
              </View>
              {/* VIN */}
              {getvin === '' ? null : (
                <TouchableOpacity
                  onPress={() => GetVin()}
                  style={{
                    marginTop: metrics.HEIGHT * 0.02,
                    alignItems: 'center',

                    marginHorizontal: '5%',
                    borderRadius: 45,
                    backgroundColor: colors.white,
                    height: 45,
                    width: 45,
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  {getvinload === true ? (
                    <ActivityIndicator color={colors.blue} size="small" />
                  ) : (
                    // <Text
                    //   style={{
                    //     color: colors.white,
                    //     fontSize: 18,
                    //     fontWeight: '600',
                    //   }}>
                    //   Submit
                    // </Text>
                    <MaterialIcons name="done" color={colors.blue} size={27} />
                  )}
                </TouchableOpacity>
              )}
            </View>
            {/*  License Plate */}
            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                License Plate
              </Text>
            </View> */}
            {aview ? (
              <>
                <View
                  style={{
                    marginTop: metrics.HEIGHT * 0.02,
                    borderRadius: 8,
                    borderColor: v2 ? 'red' : '#cccbcb',
                    borderWidth: 0.8,
                    backgroundColor: colors.white,
                  }}>
                  <TextInput
                    placeholder="Enter License Plate"
                    placeholderTextColor={'#c0bfbf'}
                    style={{
                      color: colors.black,
                      paddingHorizontal: 12,
                      fontSize: 14,
                      fontWeight: '600',
                      paddingVertical: 13,
                    }}
                    onChangeText={val => {
                      SetLiec(val);
                    }}
                  />
                </View>
                {/* License Plate */}
                {/*  Vehicle Color */}
                {/* Vehicle Color */}
                {/*  Vehicle Note */}
                {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.textgrey,
                  fontSize: 16,
                  fontWeight: '700',
                  marginHorizontal: '5%',
                }}>
                Vehicle Note
              </Text>
            </View> */}
                <View
                  style={{
                    marginTop: metrics.HEIGHT * 0.02,
                    borderRadius: 8,
                    borderColor: v3 ? 'red' : '#cccbcb',
                    borderWidth: 0.8,
                    backgroundColor: colors.white,
                  }}>
                  <TextInput
                    placeholder="Enter Vehicle Note"
                    placeholderTextColor={'#c0bfbf'}
                    style={{
                      color: colors.black,
                      paddingHorizontal: 12,
                      fontSize: 14,
                      fontWeight: '600',
                      paddingVertical: 13,
                    }}
                    onChangeText={val => {
                      SetVeNote(val);
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      marginTop: metrics.HEIGHT * 0.02,
                      justifyContent: 'center',
                      width: metrics.WIDTH * 0.3,
                    }}>
                    <Text
                      style={{
                        color: colors.gary,
                        fontSize: 14,
                        fontWeight: '700',
                        marginLeft: 5,
                      }}>
                      Vehicle Color
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setcreatechildmodel(true)}
                    style={{
                      marginTop: metrics.HEIGHT * 0.02,
                      borderRadius: 10,
                      width: metrics.WIDTH * 0.59,
                      borderColor: v4 ? 'red' : '#cccbcb',
                      borderWidth: 0.8,
                      zIndex: 1,
                    }}
                    activeOpacity={0.6}>
                    <View
                      style={{
                        borderRadius: 10,
                        paddingTop: metrics.HEIGHT * 0.02,
                        paddingBottom: metrics.HEIGHT * 0.02,
                        backgroundColor: getcolor,
                        height: metrics.HEIGHT * 0.064,
                        width: metrics.WIDTH * 0.59,
                      }}>
                      <Text
                        style={{
                          color: '#c0bfbf',
                          fontSize: 14,
                          fontWeight: '700',
                          textAlign: 'center',
                        }}>
                        Tap Here To select Color
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* Vehicle Note */}
                <TouchableOpacity
                  onPress={() => {
                    nextscreen();
                  }}>
                  <LinearGradient
                    colors={[
                      colors.themecolor,
                      colors.themecolor1,
                      colors.themecolor2,
                    ]}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{
                      marginTop: metrics.HEIGHT * 0.05,
                      alignItems: 'center',

                      borderRadius: 8,
                      // backgroundColor: colors.themecolor,
                      height: metrics.HEIGHT * 0.067,
                      borderWidth: 0.4,
                      borderColor: colors.gary,
                      marginBottom: '4%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 18,
                        fontWeight: '600',
                      }}>
                      Next
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : null}

            {getviewlist === true ? (
              <>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Year : </Text>
                  <Text style={styles.dtxt}>{getvindata.Year}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Model : </Text>
                  <Text style={styles.dtxt}>{getvindata.Model}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Vehicle Type : </Text>
                  <Text style={styles.dtxt}>{getvindata.VehicleType}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Transmission Type : </Text>
                  <Text style={styles.dtxt}>{getvindata.TransmissionType}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Short Trim : </Text>
                  <Text style={styles.dtxt}>{getvindata.ShortTrim}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Overall Length : </Text>
                  <Text style={styles.dtxt}>{getvindata.OverallLength}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>MSRP : </Text>
                  <Text style={styles.dtxt}>{getvindata.MSRP}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Highway Mileage : </Text>
                  <Text style={styles.dtxt}>{getvindata.HighwayMileage}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Fuel Capacity : </Text>
                  <Text style={styles.dtxt}>{getvindata.FuelCapacity}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Engine Cylinders : </Text>
                  <Text style={styles.dtxt}>{getvindata.EngineCylinders}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Driven Wheels : </Text>
                  <Text style={styles.dtxt}>{getvindata.DrivenWheels}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Delivery Charges : </Text>
                  <Text style={styles.dtxt}>{getvindata.DeliveryCharges}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>City Mileage : </Text>
                  <Text style={styles.dtxt}>{getvindata.CityMileage}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Make : </Text>
                  <Text style={styles.dtxt}>{getvindata.Make}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Trim : </Text>
                  <Text style={styles.dtxt}>{getvindata.Trim}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Vehicle Size : </Text>
                  <Text style={styles.dtxt}>{getvindata.VehicleSize}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Trim Variations : </Text>
                  <Text style={styles.dtxt}>{getvindata.TrimVariations}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Transmission Gears : </Text>
                  <Text style={styles.dtxt}>
                    {getvindata.TransmissionGears}
                  </Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Standard Seating : </Text>
                  <Text style={styles.dtxt}>{getvindata.StandardSeating}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Overall Width : </Text>
                  <Text style={styles.dtxt}>{getvindata.OverallLength}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Invoice Price : </Text>
                  <Text style={styles.dtxt}>{getvindata.InvoicePrice}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Fuel Type : </Text>
                  <Text style={styles.dtxt}>{getvindata.FuelType}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Engine Size : </Text>
                  <Text style={styles.dtxt}>{getvindata.EngineSize}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Engine : </Text>
                  <Text style={styles.dtxt}>{getvindata.Engine}</Text>
                </View>
                <View style={styles.dmain}>
                  <Text style={styles.dtitle}>Doors : </Text>
                  <Text style={styles.dtxt}>{getvindata.Doors}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: '5%',
                    alignItems: 'center',
                    marginTop: '4%',
                    marginBottom: 20,
                  }}>
                  <Text style={styles.dtitle}>Curb Weight : </Text>
                  <Text style={styles.dtxt}>{getvindata.CurbWeight}</Text>
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      ) : null}
      <RNModal
        transparent={true}
        isVisible={createchildmodel}
        onBackButtonPress={() => {
          setcreatechildmodel(false);
        }}
        onBackdropPress={() => {
          setcreatechildmodel(false);
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
          }}>
          <View>
            <ColorPicker
              onColorSelected={color => SetColor(`${color}`)}
              style={{
                width: '100%',
                height: '70%',
              }}
              // onColorChange={color => console.log(fromHsv({color}))}
              // hideSliders={true}
            />
          </View>
          <View
            style={{
              marginTop: '-35%',
            }}>
            <Text
              style={{textAlign: 'center', color: colors.black, fontSize: 16}}>
              Select color & touch to center circle{' '}
            </Text>
            <View
              style={{
                marginTop: '5%',
                backgroundColor: getcolor,
                height: 20,
                width: 100,
                alignSelf: 'center',
              }}
            />
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{
                padding: '4%',
                borderRadius: 5,
                marginHorizontal: '10%',
                marginTop: metrics.HEIGHT * 0.08,
                backgroundColor: colors.themecolor,
              }}
              onPress={() => {
                getcolor === ''
                  ? Toast.show('Select Color')
                  : setcreatechildmodel(false);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.white,
                  fontSize: 16,
                }}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  dmain: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    marginTop: '4%',
  },
  dtitle: {
    color: colors.white,
    fontSize: 16,
    marginRight: 10,
    fontWeight: '600',
  },
  dtxt: {
    color: colors.gary,
    fontSize: 16,
  },
});

export default AddInspection;
