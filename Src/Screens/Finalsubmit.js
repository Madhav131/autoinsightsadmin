import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../Utils/colors';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import {windowWidth} from '../Utils/Dimensions';
import Carousel from 'react-native-snap-carousel';
import metrics from '../Utils/metrics';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import images from '../Utils/images';
import RNModal from 'react-native-modal';
import moment from 'moment';

const Miancat = [
  {id: 1, name: 'xyz'},
  {id: 2, name: 'abc'},
  {id: 3, name: 'aaa'},
  {id: 4, name: 'bbb'},
  {id: 5, name: 'cde'},
];

const secondlist = [
  {id: 1, name: 'xyz'},
  {id: 2, name: 'abc'},
  {id: 3, name: 'aaa'},
  {id: 4, name: 'bbb'},
  {id: 5, name: 'cde'},
];

const Finalsubmit = props => {
  const [getindex, SetIndex] = useState('');
  const [onTheway_show, setOntheway] = useState(false);
  const [modalstatus, setstatusmodal] = useState(false);
  const [getdata, SetData] = useState(props.route.params.data);
  const [getsubcat, SetSubCat] = useState([]);
  const [getimagearray, SetImageArray] = useState([]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        // position: 'relative',
      }}>
      <StatusBar backgroundColor={colors.whitesomke} barStyle="dark-content" />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: '2%',
          paddingVertical: metrics.HEIGHT * 0.01,
          elevation: 5,
          backgroundColor: colors.white,
          marginTop: Platform.OS === 'ios' ? '10%' : 0,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', left: '10%'}}
          onPress={() => props.navigation.goBack(null)}>
          <Ionicons name="arrow-back" size={35} color={colors.themecolor} />
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
          }}></View>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      <View
        style={{
          // backgroundColor: 'red',
          marginTop: metrics.HEIGHT * 0.02,
          marginHorizontal: '10%',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <Image
          source={require('../Assets/image1.jpeg')}
          style={{
            height: 150,
            width: 320,
            borderRadius: 10,
            // resizeMode: 'cover',
            // backgroundColor: 'red',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{paddingTop: metrics.HEIGHT * 0.02}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            color: colors.themecolor,
            fontWeight: 'bold',
          }}>
          {getdata.make}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: '5%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: metrics.HEIGHT * 0.01,
          marginBottom: metrics.HEIGHT * 0.01,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Fontisto name="date" color={colors.black} size={20} />
          <Text style={{color: colors.black, left: '5%'}}>
            {moment(getdata.updated_at).format('DD-MM-YYYY')}{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="ios-time-outline" color={colors.black} size={20} />
          <Text style={{color: colors.black, left: '5%'}}>
            {moment(getdata.updated_at).format('hh:mm A')}{' '}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderStyle: 'dashed',
          borderWidth: 0.8,
          // borderRadius: 1,
          marginHorizontal: '2%',
        }}></View>
      <FlatList
        data={getdata.category_id}
        renderItem={({item, index}) => {
          return (
            <>
              <View
                style={{
                  marginHorizontal: '2.5%',
                  flexDirection: 'row',
                  width: '90%',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                }}>
                {index === getindex ? (
                  <Image
                    source={require('../Assets/list.gif')}
                    style={{width: 50, height: 70}}
                    resizeMode="contain"
                  />
                ) : (
                  <View
                    style={{
                      width: 50,
                      height: 80,
                      // backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="carryout" color={'#808080'} size={40} />
                  </View>
                )}
                {onTheway_show === true && getindex == index ? (
                  <View
                    style={{
                      backgroundColor: '#87cefa',
                      width: '85%',
                      padding: 10,
                      borderRadius: 5,
                      borderBottomColor: 'red',
                      borderBottomWidth: 0.5,
                      elevation: 5,
                      marginTop: metrics.HEIGHT * 0.01,
                    }}>
                    <FlatList
                      data={getsubcat}
                      renderItem={({item, index}) => {
                        return (
                          <Animatable.View
                            animation="zoomIn"
                            style={{
                              backgroundColor: colors.whitesomke,
                              width: '100%',
                              padding: 10,
                              borderRadius: 5,
                              borderColor: 'red',
                              borderWidth: 0.5,
                              marginTop: '5%',
                              // elevation: 5,
                            }}>
                            <Text
                              style={{
                                color: colors.black,
                                fontSize: 17,
                                padding: 2,
                                fontWeight: '600',
                              }}>
                              Name:-{' '}
                              <Text
                                style={{
                                  color: colors.black,
                                  fontSize: 15,
                                  padding: 2,
                                  fontWeight: '400',
                                }}>
                                {item.sub_category.name}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                color: colors.black,
                                fontSize: 17,
                                padding: 2,
                                fontWeight: '600',
                              }}>
                              Note:-{' '}
                              <Text
                                style={{
                                  color: colors.black,
                                  fontSize: 15,
                                  padding: 2,
                                  fontWeight: '400',
                                }}>
                                {item.note}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                color: colors.black,
                                fontSize: 17,
                                padding: 2,
                                fontWeight: '600',
                              }}>
                              Status:-{' '}
                              <Text
                                style={{
                                  color:
                                    item.status == 1
                                      ? 'green'
                                      : item.status == 2
                                      ? '#FEBE00'
                                      : item.status == 3
                                      ? 'red'
                                      : null,
                                  fontSize: 16,
                                  padding: 2,
                                  fontWeight: 'bold',
                                }}>
                                {item.status == 1
                                  ? 'Success'
                                  : item.status == 2
                                  ? 'Warning'
                                  : item.status == 3
                                  ? 'Danger'
                                  : null}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                color: colors.black,
                                fontSize: 17,
                                padding: 2,
                                fontWeight: '600',
                              }}>
                              Date:-{' '}
                              <Text
                                style={{
                                  color: colors.black,
                                  fontSize: 15,
                                  padding: 2,
                                  fontWeight: '400',
                                }}>
                                {moment(item.updated_at).format('DD-MM-YYYY')}
                                {'  '}
                                {moment(item.updated_at).format('HH:MM A')}
                              </Text>
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                setstatusmodal(true);
                                SetImageArray(item.image);
                              }}
                              style={{
                                width: 35,
                                height: 35,
                                borderRadius: 35,
                                backgroundColor: '#87cefa',
                                // position: 'absolute',
                                // top: 28,
                                // right: -25,

                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'flex-end',
                              }}>
                              <MaterialIcons
                                name="keyboard-arrow-right"
                                size={30}
                                color={colors.white}
                              />
                            </TouchableOpacity>
                          </Animatable.View>
                        );
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setOntheway(!onTheway_show);
                        SetIndex('');
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: colors.white,
                        elevation: 5,
                        alignSelf: 'flex-end',
                        marginTop: metrics.HEIGHT * 0.01,
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../Assets/up.gif')}
                        style={{width: 50, height: 30}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setOntheway(true, onTheway_show);
                      SetIndex(index);
                      SetSubCat(item.sub_category);
                    }}
                    style={{
                      backgroundColor: colors.whitesomke,
                      width: '85%',
                      padding: 10,
                      borderRadius: 5,
                      borderBottomColor: 'red',
                      borderBottomWidth: 0.5,
                      elevation: 5,
                    }}>
                    <Text
                      style={{
                        color: colors.blue,
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
      <RNModal
        animationType="slide"
        transparent={true}
        isVisible={modalstatus}
        onBackButtonPress={() => {
          setstatusmodal(false);
        }}
        onBackdropPress={() => {
          setstatusmodal(false);
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 5,
            // flex: 1,

            width: metrics.WIDTH * 0.9,
            alignSelf: 'center',
            marginTop: '10%',
            marginBottom: '10%',
            paddingTop: 15,
            elevation: 3,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../Assets/image2.jpeg')}
                style={{
                  height: 150,
                  width: 320,
                  borderRadius: 10,
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: metrics.HEIGHT * 0.01,
                marginBottom: metrics.HEIGHT * 0.02,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: colors.lightblue,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                INSPECTION
              </Text>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Name:-{' '}
                  <Text style={styles.text1}>
                    {getdata.make} {getdata.model} - {getdata.year}{' '}
                  </Text>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Ro No:- <Text style={styles.text1}>{getdata.ro_no}</Text>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  OdoMeter:-{' '}
                  <Text style={styles.text1}>{getdata.odometer}</Text>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Vehicle Note:-{' '}
                  <Text style={styles.text1}>{getdata.vehicle_note}</Text>
                </Text>
              </View>
              <View style={[styles.viewtext]}>
                <Text style={styles.text}>
                  Vehicle Color:-{' '}
                  <View
                    style={{
                      backgroundColor: `${getdata.vehicle_color}`,
                      width: 40,
                      height: 15,
                      // borderRadius: 15,
                      elevation: 2,
                    }}>
                    <Text style={{}}></Text>
                  </View>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  License Plate:-{' '}
                  <Text style={styles.text1}>{getdata.license_plate}</Text>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Parts Requisition:-
                  <Text style={styles.text1}>
                    {' '}
                    {getdata.parts_requisition}{' '}
                  </Text>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Vin:- <Text style={styles.text1}>{getdata.vin}</Text>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Inspection Note:-{' '}
                  <Text style={styles.text1}>{getdata.inspection_note}</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: metrics.HEIGHT * 0.0,
                marginBottom: metrics.HEIGHT * 0.02,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: colors.lightblue,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                FRANCHISES
              </Text>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Name:-{' '}
                  <Text style={styles.text1}>{getdata.franchises.name}</Text>
                </Text>
              </View>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Email:-{' '}
                  <Text style={styles.text1}>{getdata.franchises.email}</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: metrics.HEIGHT * 0.0,
                marginBottom: metrics.HEIGHT * 0.02,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: colors.lightblue,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                TEMPLATE
              </Text>
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  Name:-{' '}
                  <Text style={styles.text1}>
                    {getdata.template.template_name}
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: metrics.HEIGHT * 0.0,
                marginBottom: metrics.HEIGHT * 0.02,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: colors.lightblue,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                IMAGES
              </Text>
              <View style={styles.viewtext}>
                <FlatList
                  data={getimagearray}
                  horizontal={true}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: colors.gary,
                          width: 100,

                          height: 130,
                          marginLeft: 10,
                          alignSelf: 'center',
                          // elevation: 5,
                        }}>
                        <Image
                          source={{uri: item.image_full_path}}
                          style={{
                            width: 90,
                            height: 90,
                            alignSelf: 'center',
                          }}
                          resizeMode="contain"></Image>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setstatusmodal(false);
              }}
              style={{
                backgroundColor: colors.white,
                marginBottom: metrics.HEIGHT * 0.02,
                // width: '30%',
                alignSelf: 'center',
                padding: 10,
                borderRadius: 5,
                borderStyle: 'dashed',
                borderWidth: 0.5,
                borderColor: 'red',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../Assets/done.gif')}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <Text
                style={{color: colors.black, fontSize: 14, fontWeight: 'bold'}}>
                GO BACK
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </RNModal>
    </View>
  );
};

export default Finalsubmit;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 16,
    marginTop: '2%',
    fontWeight: 'bold',
  },
  text1: {
    color: colors.black,
    fontSize: 16,
    marginTop: '2%',
    fontWeight: '400',
  },
  viewtext: {
    padding: 3,
  },
});
