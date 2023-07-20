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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../Utils/colors';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import {windowWidth} from '../Utils/Dimensions';
import Carousel from 'react-native-snap-carousel';
import metrics from '../Utils/metrics';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../Utils/images';
import {CheckBox} from 'react-native-elements';
import {useUserContext} from '../Context/user_context';
import IndicatorCom from '../components/IndicatorCom';
const DATA = [
  {
    id: 1,
    name: 'Car',
    img: images.car_wash_logo2,
    price: 10,
    time: '  30 to 40 minutes',
    dis: 'Demo test demo test demo test',
  },
  {
    id: 2,
    name: 'Bike',
    img: images.bike_logo,
    price: 20,
    time: '  30 to 40 minutes',
    dis: 'Demo test demo test demo test',
  },
  {
    id: 3,
    name: 'Jeep',
    img: images.jeep_logo,
    price: 30,
    time: '  30 to 40 minutes',
    dis: 'Demo test demo test demo test',
  },
  {
    id: 4,
    name: 'Motorcycle',
    img: images.motorcycle_logo,
    price: 100,
    time: '  30 to 40 minutes',
    dis: 'Demo test demo test demo test',
  },
  {
    id: 5,
    name: 'Ven',
    img: images.ven_logo,
    price: 10,
    time: '  30 to 40 minutes',
    dis: 'Demo test demo test demo test',
  },
  {
    id: 6,
    name: 'Truck',
    img: images.truck_logo,
    price: 150,
    time: '  30 to 40 minutes',
    dis: 'Demo test demo test demo test',
  },
  {
    id: 7,
    name: 'Transportation',
    img: images.trecter_logo,
    price: 120,
    time: '  30 to 40 minutes',
    dis: 'Demo test demo test demo test',
  },
];

const Subservice = props => {
  const {inspection_data, inspection_loding} = useUserContext();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.whitesomke,
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
          marginTop: metrics.HEIGHT * 0.01,
          marginHorizontal: '2%',
          marginBottom: metrics.HEIGHT * 0.01,
        }}>
        <Text
          style={{
            color: colors.textgrey,
            fontSize: 20,
            fontWeight: '700',
            marginHorizontal: '5%',
          }}>
          Select Your Vehicle
        </Text>
      </View>
      {inspection_loding ? (
        <IndicatorCom />
      ) : (
        <FlatList
          data={inspection_data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Finalsubmit', {
                    data: item,
                  })
                }
                style={{
                  marginHorizontal: '2%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                  elevation: 5,
                  flex: 1,
                  marginBottom: 10,
                  backgroundColor: colors.white,
                  borderRadius: 8,
                  borderBottomColor: 'red',
                  borderBottomWidth: 0.2,
                }}>
                <View
                  style={{
                    // flex: 0.28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.gary,
                    padding: 10,
                    borderRadius: 78,
                    overflow: 'hidden',
                    width: 78,
                    height: 78,
                  }}>
                  <Image
                    source={images.car_wash_logo2}
                    style={{width: 44, height: 44}}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    flex: 0.7,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                    height: '100%',
                    // backgroundColor: colors.blue,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: colors.black,
                      fontSize: 17,
                      padding: 2,
                    }}>
                    {item.make} {item.model} - {item.year}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: colors.black,
                      fontSize: 14,
                      padding: 2,
                    }}>
                    License Plate: {item.license_plate}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: colors.black,
                      fontSize: 14,
                      padding: 2,
                    }}>
                    Template Name: {item.template.template_name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: colors.black,
                      fontSize: 14,
                      padding: 2,
                    }}>
                    Vin: {item.vin}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: colors.black,
                      fontSize: 14,
                      padding: 2,
                    }}>
                    Inspection Note: {item.inspection_note}
                  </Text>

                  <Text
                    style={{
                      fontWeight: '600',
                      color:
                        item.status == 0
                          ? 'red'
                          : item.status == 1
                          ? 'green'
                          : null,
                      fontSize: 16,
                    }}>
                    {item.status == 0
                      ? 'Pending'
                      : item.status == 1
                      ? 'Completed'
                      : null}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    height: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  {/* <Text
                  style={{
                    fontWeight: '900',
                    color: colors.black,
                    fontSize: 14,
                  }}></Text> */}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default Subservice;

{
  // const [getcheck, setcheck] = useState([]);
  // const [getindex, setindex] = useState([]);
  // const [newArray, setArray] = useState([]);
  // const [getlist, setlist] = useState([]);
  // const check = (item, index, value) => {
  //   setindex(item);
  //   if (value) getcheck[index] = value;
  //   else getcheck[index] = !getcheck[index];
  //   if (getcheck[index]) setArray([...newArray, item]);
  //   else
  //     setArray(
  //       newArray.filter(function (i) {
  //         return i.id !== item.id;
  //       }),
  //     );
  //   if (setcheck[item] == true) {
  //     setlist.push(getindex);
  //     setlist(getindex);
  //   } else {
  //     var temp = getcheck.filter((x, i) => x !== getindex);
  //     setlist(temp);
  //   }
  // };
  /* <FlatList
        data={DATA}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                check(item, index);
              }}
              style={{
                marginHorizontal: '2%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                flex: 1,
                marginBottom: 10,
                backgroundColor: colors.white,
                borderRadius: 8,
              }}>
              <CheckBox
                checked={getcheck[(item, index)]}
                onPress={() => check(item, index)}
              />
              <View
                style={{
                  // flex: 0.28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.gary,
                  padding: 10,
                  borderRadius: 78,
                  overflow: 'hidden',
                  width: 78,
                  height: 78,
                }}>
                <Image
                  source={item.img}
                  style={{width: 44, height: 44}}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flex: 0.64,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-evenly',
                  height: '100%',
                  // backgroundColor: colors.blue,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: colors.black,
                    fontSize: 14,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontWeight: '700',
                    color: colors.transparentBlack,
                    fontSize: 12,
                  }}>
                  {item.time}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.black,
                    fontSize: 12,
                  }}>
                  {item.dis}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.28,
                  height: '100%',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '900',
                    color: colors.black,
                    fontSize: 14,
                  }}>
                  ₹ {item.price}.00
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
     
      <View
        style={{
          backgroundColor: colors.white,
          padding: 15,

        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '5%',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: colors.black,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              ₹ {newArray.reduce((a, v) => Math.round((a = a + v.price)), 0)}.00
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Finalsubmit')}
            style={{
              backgroundColor: colors.lightblue,
              width: '25%',
              padding: 12,
              borderRadius: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.white,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View> */
}
