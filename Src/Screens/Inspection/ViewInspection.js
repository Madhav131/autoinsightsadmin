/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-inline-styles.mainView */
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
  Modal,
  TextInput,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import LinearGradient from 'react-native-linear-gradient';

const item_data = [
  {id: 1, name: 'Right', number: '10'},
  {id: 2, name: 'Recs.', number: '50'},
  {id: 3, name: 'Priority', number: '35'},
];

const results_data = [
  {id: 1, name: 'Right', number: '10', img: require('../../Assets/right.png')},
  {id: 2, name: 'Recs.', number: '50', img: require('../../Assets/Notes.png')},
  {
    id: 3,
    name: 'Priority',
    number: '35',
    img: require('../../Assets/warning.png'),
  },
  {
    id: 4,
    name: 'Priority',
    number: '35',
    img: require('../../Assets/Wrong.png'),
  },
];

const ViewInSpection = props => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetVin();
    });

    return unsubscribe;
  }, [props]);

  useEffect(() => {
    const backAction = () => {
      props.navigation.replace('Inspection');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [getcondition, SetCondition] = useState(false);
  const [getcondition1, SetCondition1] = useState(false);
  const [getcondition2, SetCondition2] = useState(false);
  const [getdata, SetData] = useState(props.route.params.data);
  const [getvindata, SetVinData] = useState('');
  const [onTheway_show, setOntheway] = useState(false);
  const [getindex, SetIndex] = useState('');
  const [getsubcat, SetSubCat] = useState([]);
  const [paused, setPaused] = useState(true);
  const [imagemodal, SetImageModal] = useState(false);
  const [image_index, SetImage_index] = useState(0);
  const [image_url, SetImage_Url] = useState('');

  const GetVin = async () => {
    var Token = await AsyncStorage.getItem('token');

    const fromdata = new FormData();
    fromdata.append('vin', getdata.vin);
    axios
      .post(get_vin, fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === '1') {
          SetVinData(res.data.data.attributes);
        } else {
        }
      })
      .catch(err => {
        // console.log('err11', err);
      });
  };

  return (
    <LinearGradient
      colors={[colors.themecolor, colors.themecolor1, colors.themecolor2]}
      start={{x: 1.5, y: 0.5}}
      end={{x: 0, y: 0}}
      style={{
        flex: 1,
        // backgroundColor: colors.white,
        // position: 'relative',
      }}>
      <StatusBar backgroundColor={colors.themecolor} barStyle="light-content" />

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: '2%',
          paddingVertical: metrics.HEIGHT * 0.01,
          backgroundColor: colors.themecolor,
          marginTop: Platform.OS === 'ios' ? '10%' : 0,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', left: '10%'}}
          onPress={() => props.navigation.replace('MainTabScreen')}>
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
      <ScrollView>
        <View
          style={{
            marginTop: '5%',
            marginHorizontal: '1%',
            borderWidth: 0.5,
            borderRadius: 10,
            backgroundColor: colors.white,
            borderColor: '#c0bfbf',
            elevation: 1,
            marginBottom: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                borderLeftWidth: 5,
                borderRadius: 10,
                borderLeftColor: colors.themecolor,
                marginRight: 13,
              }}
            />
            <Text
              style={{
                color: colors.themecolor,
                fontSize: 24,
                fontWeight: '500',
              }}>
              Inspection Detail
            </Text>
            {/* <AntDesign
            name={getcondition === true ? 'caretup' : 'caretdown'}
            color={colors.black}
            size={25}
          /> */}
          </View>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Franchise :</Text>
          <Text style={styles.dTxt}>{getdata.franchises.name}</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Template : </Text>
          <Text style={styles.dTxt}>{getdata.template.template_name}</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>RO Number : </Text>
          <Text style={styles.dTxt}>{getdata.ro_no}</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Odometer : </Text>
          <Text style={styles.dTxt}>{getdata.odometer}</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Manager : </Text>
          <Text style={styles.dTxt}></Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Mechanic : </Text>
          <Text style={styles.dTxt}></Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Inspection note : </Text>
          <Text style={styles.dTxt}>{getdata.inspection_note}</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Part Requisition : </Text>
          <Text style={styles.dTxt}>{getdata.parts_requisition}</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>items : </Text>
          <View>
            <FlatList
              data={item_data}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      paddingLeft: '8%',
                      paddingRight: '8%',
                    }}>
                    <Text style={{color: colors.white}}>{item.name}</Text>
                  </View>
                );
              }}
            />
            <FlatList
              data={item_data}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      paddingLeft: '10%',
                      paddingRight: '10%',
                    }}>
                    <Text style={{color: colors.white}}>{item.number}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Results : </Text>
          <View>
            <FlatList
              data={results_data}
              numColumns={4}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      paddingLeft: '3%',
                      paddingRight: '3%',
                    }}>
                    <Image
                      source={item.img}
                      resizeMode="contain"
                      style={{height: 30, width: 30}}
                    />
                  </View>
                );
              }}
            />
            <FlatList
              data={results_data}
              numColumns={4}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      paddingLeft: '6%',
                      paddingRight: '6%',
                    }}>
                    <Text style={{color: colors.white}}>{item.number}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: '5%',
            marginHorizontal: '1%',
            borderWidth: 0.5,
            borderRadius: 10,
            backgroundColor: colors.white,
            borderColor: '#c0bfbf',
            elevation: 1,
            marginBottom: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                borderLeftWidth: 5,
                borderRadius: 10,
                borderLeftColor: colors.themecolor,
                marginRight: 13,
              }}
            />
            <Text
              style={{
                color: colors.themecolor,
                fontSize: 24,
                fontWeight: '500',
              }}>
              Customer Detail
            </Text>
            {/* <AntDesign
            name={getcondition === true ? 'caretup' : 'caretdown'}
            color={colors.black}
            size={25}
          /> */}
          </View>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>First name :</Text>
          <Text style={styles.dTxt}> {getdata.customers.name} </Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Last name : </Text>
          <Text style={styles.dTxt}> {getdata.customers.last_name} </Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Email : </Text>
          <Text style={styles.dTxt}>{getdata.customers.email} </Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Contact Preference : </Text>
          <Text style={styles.dTxt}>
            {getdata.customers.contact_preference}
          </Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTxt}>Customer Note : </Text>
          <Text style={styles.dTxt}>{getdata.customers.note} </Text>
        </View>
        <View
          style={{
            marginTop: '5%',
            marginHorizontal: '1%',
            borderWidth: 0.5,
            borderRadius: 10,
            backgroundColor: colors.white,
            borderColor: '#c0bfbf',
            elevation: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                borderLeftWidth: 5,
                borderRadius: 10,
                borderLeftColor: colors.themecolor,
                marginRight: 13,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                SetCondition(!getcondition);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 20,
                  fontWeight: '500',
                  marginTop: 1,
                  width: metrics.WIDTH * 0.75,
                }}>
                Details
              </Text>
              <Entypo
                name={getcondition === true ? 'chevron-up' : 'chevron-down'}
                color={colors.themecolor}
                size={32}
              />
            </TouchableOpacity>
          </View>
          {getcondition === true ? (
            <View style={{marginBottom: '6%'}}>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Year :</Text>
                <Text style={styles.dTxt1}>{getvindata.Year}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Model :</Text>
                <Text style={styles.dTxt1}>{getvindata.Model}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Vehicle Type :</Text>
                <Text style={styles.dTxt1}>{getvindata.VehicleType}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Transmission Type :</Text>
                <Text style={styles.dTxt1}>{getvindata.TransmissionType}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Short Trim :</Text>
                <Text style={styles.dTxt1}>{getvindata.ShortTrim}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Overall Length :</Text>
                <Text style={styles.dTxt1}>{getvindata.OverallLength}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>MSRP :</Text>
                <Text style={styles.dTxt1}>{getvindata.MSRP}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Highway Mileage :</Text>
                <Text style={styles.dTxt1}>{getvindata.HighwayMileage}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Fuel Capacity :</Text>
                <Text style={styles.dTxt1}>{getvindata.FuelCapacity}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Engine Cylinders :</Text>
                <Text style={styles.dTxt1}>{getvindata.EngineCylinders}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Driven Wheels :</Text>
                <Text style={styles.dTxt1}>{getvindata.DrivenWheels}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Delivery Charges :</Text>
                <Text style={styles.dTxt1}>{getvindata.DeliveryCharges}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>City Mileage :</Text>
                <Text style={styles.dTxt1}>{getvindata.CityMileage}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Make :</Text>
                <Text style={styles.dTxt1}>{getvindata.Make}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Trim :</Text>
                <Text style={styles.dTxt1}>{getvindata.Trim}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Vehicle Size :</Text>
                <Text style={styles.dTxt1}>{getvindata.VehicleSize}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Trim Variations :</Text>
                <Text style={styles.dTxt1}>{getvindata.TrimVariations}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Transmission Gears :</Text>
                <Text style={styles.dTxt1}>{getvindata.TransmissionGears}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Standard Seating :</Text>
                <Text style={styles.dTxt1}>{getvindata.StandardSeating}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Overall Width :</Text>
                <Text style={styles.dTxt1}>{getvindata.OverallLength}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Invoice Price :</Text>
                <Text style={styles.dTxt1}>{getvindata.InvoicePrice}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Fuel Type :</Text>
                <Text style={styles.dTxt1}>{getvindata.FuelType}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Engine Size :</Text>
                <Text style={styles.dTxt1}>{getvindata.EngineSize}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Engine :</Text>
                <Text style={styles.dTxt1}>{getvindata.Engine}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Doors :</Text>
                <Text style={styles.dTxt1}>{getvindata.Doors}</Text>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.mainTxt1}>Curb Weight :</Text>
                <Text style={styles.dTxt1}>{getvindata.CurbWeight}</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View
          style={{
            marginTop: '5%',
            marginHorizontal: '1%',
            borderWidth: 0.5,
            borderRadius: 10,
            backgroundColor: colors.white,
            borderColor: '#c0bfbf',
            elevation: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                borderLeftWidth: 5,
                borderRadius: 10,
                borderLeftColor: colors.themecolor,
                marginRight: 13,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                SetCondition1(!getcondition1);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 20,
                  fontWeight: '500',
                  marginTop: 1,
                  width: metrics.WIDTH * 0.75,
                }}>
                Images
              </Text>
              <Entypo
                name={getcondition === true ? 'chevron-up' : 'chevron-down'}
                color={colors.themecolor}
                size={32}
              />
            </TouchableOpacity>
          </View>
          {getcondition1 === true ? (
            <>
              <View
                style={{
                  marginHorizontal: '2%',
                  marginTop: '5%',
                }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Front Left Image :
                </Text>
                <Image
                  source={
                    getdata.front_left_image_full_path === ''
                      ? require('../../Assets/logo.png')
                      : {uri: getdata.front_left_image_full_path}
                  }
                  style={{
                    width: metrics.WIDTH * 0.9,
                    height: metrics.HEIGHT * 0.2,
                    padding: 15,
                    marginTop: '3%',
                    borderRadius: 7,
                    borderWidth: 0.5,
                    borderColor: '#c0bfbf',
                  }}
                  resizeMode="center"
                />
              </View>
              <View
                style={{
                  marginHorizontal: '2%',
                  marginTop: '5%',
                }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Front Right Image :
                </Text>
                <Image
                  source={
                    getdata.front_right_image_full_path === ''
                      ? require('../../Assets/logo.png')
                      : {uri: getdata.front_right_image_full_path}
                  }
                  style={{
                    width: metrics.WIDTH * 0.9,
                    height: metrics.HEIGHT * 0.2,
                    padding: 15,
                    marginTop: '3%',
                    borderRadius: 7,
                    borderWidth: 0.5,
                    borderColor: '#c0bfbf',
                  }}
                  resizeMode="center"
                />
              </View>
              <View
                style={{
                  marginHorizontal: '2%',
                  marginTop: '5%',
                }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Back Left Image :
                </Text>
                <Image
                  source={
                    getdata.back_left_image_full_path === ''
                      ? require('../../Assets/logo.png')
                      : {uri: getdata.back_left_image_full_path}
                  }
                  style={{
                    width: metrics.WIDTH * 0.9,
                    height: metrics.HEIGHT * 0.2,
                    padding: 15,
                    marginTop: '3%',
                    borderRadius: 7,
                    borderWidth: 0.5,
                    borderColor: '#c0bfbf',
                  }}
                  resizeMode="center"
                />
              </View>
              <View
                style={{
                  marginHorizontal: '2%',
                  marginTop: '5%',
                }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Back Right Image :
                </Text>
                <Image
                  source={
                    getdata.back_right_image_full_path === ''
                      ? require('../../Assets/logo.png')
                      : {uri: getdata.back_right_image_full_path}
                  }
                  style={{
                    width: metrics.WIDTH * 0.9,
                    height: metrics.HEIGHT * 0.2,
                    padding: 15,
                    marginTop: '3%',
                    borderRadius: 7,
                    borderWidth: 0.5,
                    borderColor: '#c0bfbf',
                  }}
                  resizeMode="center"
                />
              </View>
              <View
                style={{
                  marginHorizontal: '2%',
                  marginTop: '5%',
                  marginBottom: '4%',
                }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Video upload :
                </Text>
                <Video
                  // source={{
                  //   uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  // }}
                  source={{
                    uri: getdata.video_full_path,
                  }}
                  volume={50}
                  // onError={err => console.log('errr', err)}
                  style={{
                    width: metrics.WIDTH * 0.9,
                    height: metrics.HEIGHT * 0.2,
                    padding: 15,
                    marginTop: '3%',
                    borderRadius: 7,
                    borderWidth: 0.5,
                    borderColor: '#c0bfbf',
                  }}
                  paused={paused}
                  repeat={false}
                  onEnd={() => {
                    setPaused(!paused);
                    // setIndex(index);
                  }}
                  controls={true}
                  resizeMode={'cover'}
                  posterResizeMode={'contain'}
                />
              </View>
            </>
          ) : null}
        </View>
        <View
          style={{
            marginTop: '5%',
            marginHorizontal: '1%',
            borderWidth: 0.5,
            borderRadius: 10,
            backgroundColor: colors.white,
            borderColor: '#c0bfbf',
            elevation: 1,
            marginBottom: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                borderLeftWidth: 5,
                borderRadius: 10,
                borderLeftColor: colors.themecolor,
                marginRight: 13,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                SetCondition2(!getcondition2);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 20,
                  fontWeight: '500',
                  marginTop: 1,
                  width: metrics.WIDTH * 0.75,
                }}>
                Findings
              </Text>
              <Entypo
                name={getcondition === true ? 'chevron-up' : 'chevron-down'}
                color={colors.themecolor}
                size={32}
              />
            </TouchableOpacity>
          </View>
          {getcondition2 === true ? (
            <>
              <FlatList
                data={getdata.category_id}
                style={{paddingBottom: '4%'}}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <View
                        style={{
                          //   marginHorizontal: '2.5%',
                          marginTop: '5%',
                          justifyContent: 'space-between',
                        }}>
                        {onTheway_show === true && getindex === index ? (
                          <View
                            style={{
                              padding: 10,
                              borderRadius: 5,
                              //   marginTop: metrics.HEIGHT * 0.01,
                            }}>
                            <FlatList
                              data={getsubcat}
                              renderItem={({item, index}) => {
                                return (
                                  <View
                                    animation="zoomIn"
                                    style={{
                                      marginBottom: '3%',
                                      backgroundColor:
                                        item.status === 1
                                          ? '#CFF4F0'
                                          : item.status === 2
                                          ? '#FFF07F'
                                          : item.status === 3
                                          ? '#FEC5C5'
                                          : null,

                                      padding: 10,
                                      borderRadius: 5,
                                    }}>
                                    <View
                                      style={{
                                        backgroundColor:
                                          item.status === 1
                                            ? '#CFF4F0'
                                            : item.status === 2
                                            ? '#FFF07F'
                                            : item.status === 3
                                            ? '#FEC5C5'
                                            : null,
                                      }}>
                                      <Text
                                        style={{
                                          color: colors.themecolor,
                                          fontSize: 15,
                                          padding: 2,
                                          fontWeight: '400',
                                        }}>
                                        {item.sub_category.name}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        marginTop: '4%',
                                      }}>
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        Before Inspection:-
                                      </Text>
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                        }}>
                                        {item.note}
                                      </Text>
                                      <FlatList
                                        data={item.image}
                                        horizontal={true}
                                        style={{
                                          marginTop: '2%',
                                          marginBottom: '2%',
                                        }}
                                        renderItem={({item, index}) => {
                                          return (
                                            <TouchableOpacity
                                              onPress={() => {
                                                SetImageModal(true);
                                                SetImage_index(index);
                                                SetImage_Url(
                                                  item.image_full_path,
                                                );
                                              }}
                                              style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 6,
                                                width: 100,
                                                backgroundColor: colors.white,
                                                height: 100,
                                                marginLeft: 10,
                                                alignSelf: 'center',
                                                elevation: 5,
                                              }}>
                                              <Image
                                                source={{
                                                  uri: item.image_full_path,
                                                }}
                                                style={{
                                                  width: 90,
                                                  height: 90,
                                                  alignSelf: 'center',
                                                }}
                                                resizeMode="center"
                                              />
                                            </TouchableOpacity>
                                          );
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                          marginTop: '4%',
                                        }}>
                                        After Inspection:-
                                      </Text>
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                        }}>
                                        {item.after_note}
                                      </Text>
                                      <FlatList
                                        data={item.afterimage}
                                        horizontal={true}
                                        style={{
                                          marginTop: '2%',
                                          marginBottom: '2%',
                                        }}
                                        renderItem={({item, index}) => {
                                          return (
                                            <TouchableOpacity
                                              onPress={() => {
                                                SetImageModal(true);
                                                SetImage_index(index);
                                                SetImage_Url(
                                                  item.image_full_path,
                                                );
                                              }}
                                              style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 6,
                                                width: 100,
                                                backgroundColor: colors.white,
                                                height: 100,
                                                marginLeft: 10,
                                                alignSelf: 'center',
                                                elevation: 5,
                                              }}>
                                              <Image
                                                source={{
                                                  uri: item.image_full_path,
                                                }}
                                                style={{
                                                  width: 90,
                                                  height: 90,
                                                  alignSelf: 'center',
                                                }}
                                                resizeMode="center"
                                              />
                                            </TouchableOpacity>
                                          );
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                          marginTop: '4%',
                                        }}>
                                        Findings Inspection:-
                                      </Text>
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                        }}>
                                        {item.findings_remark}
                                      </Text>
                                      <FlatList
                                        data={item.findings}
                                        horizontal={true}
                                        style={{
                                          marginTop: '2%',
                                          marginBottom: '2%',
                                        }}
                                        renderItem={({item, index}) => {
                                          return (
                                            <TouchableOpacity
                                              onPress={() => {
                                                SetImageModal(true);
                                                SetImage_index(index);
                                                SetImage_Url(
                                                  item.image_full_path,
                                                );
                                              }}
                                              style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 6,
                                                width: 100,
                                                backgroundColor: colors.white,
                                                height: 100,
                                                marginLeft: 10,
                                                alignSelf: 'center',
                                                elevation: 5,
                                              }}>
                                              <Image
                                                source={{
                                                  uri: item.image_full_path,
                                                }}
                                                style={{
                                                  width: 90,
                                                  height: 90,
                                                  alignSelf: 'center',
                                                }}
                                                resizeMode="center"
                                              />
                                            </TouchableOpacity>
                                          );
                                        }}
                                      />
                                    </View>
                                    <Text
                                      style={{
                                        color: colors.black,
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        marginTop: '4%',
                                      }}>
                                      Sub Findings:-
                                    </Text>
                                    <Text
                                      style={{
                                        color: colors.black,
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        marginTop: '4%',
                                      }}>
                                      {item.subfindings
                                        ? item.subfindings.findings
                                        : ''}{' '}
                                      -{' '}
                                      {item.subfindings
                                        ? item.subfindings.recommendations
                                            .recommendations
                                        : ''}
                                    </Text>
                                  </View>
                                );
                              }}
                            />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setOntheway(true, onTheway_show);
                              SetIndex(index);
                              SetSubCat(item.sub_category);
                            }}
                            style={{
                              marginHorizontal: '6%',
                              backgroundColor: colors.white,
                              borderWidth: 0.5,
                              borderColor: '#c0bfbf',
                              elevation: 2,
                              padding: 10,
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                color: colors.themecolor,
                                fontSize: 18,
                                fontWeight: '500',
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </>
                  );
                }}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      <Modal
        visible={imagemodal}
        // visible={true}

        onRequestClose={() => SetImageModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="close-circle"
            color={colors.black}
            size={40}
            style={{
              position: 'absolute',
              right: '5%',
              top: '2%',
            }}
            onPress={() => SetImageModal(false)}
          />
          <View
            style={{
              height: '80%',
              // backgroundColor: 'red',
            }}>
            <ImageViewer
              imageUrls={[{url: image_url}]}
              backgroundColor={colors.white}
              // imageUrls={this.state.image_array}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    marginLeft: metrics.WIDTH * 0.08,
    marginTop: metrics.HEIGHT * 0.015,
  },
  mainTxt: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
  },
  dTxt: {
    color: colors.gary,
    fontSize: 16,
  },
  mainTxt1: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
  },
  dTxt1: {
    color: colors.textgrey,
    fontSize: 16,
  },
});

export default ViewInSpection;
