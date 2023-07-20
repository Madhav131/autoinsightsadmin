/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  Button,
  ActivityIndicator,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../Utils/images';
import {useUserContext} from '../Context/user_context';
import IndicatorCom from '../components/IndicatorCom';
const sliderData = [
  {
    title: 'First Game',
    image: require('../Assets/image.jpeg'),
  },
  {
    title: 'Second Game',
    image: require('../Assets/image1.jpeg'),
  },
  {
    title: 'Third Game',
    image: require('../Assets/image2.jpeg'),
  },
];

const mainlist = [
  {id: 1, name: 'Franchise', img: require('../Assets/service1.png')},
  {id: 2, name: 'Franchise1', img: require('../Assets/service2.png')},
  {id: 3, name: 'Franchise2', img: require('../Assets/service3.png')},
  {id: 4, name: 'Franchise3', img: require('../Assets/service4.png')},
  {id: 5, name: 'Franchise4', img: require('../Assets/service5.png')},
  {id: 6, name: 'Franchise5', img: require('../Assets/service6.png')},
];

const HomeScreen = props => {
  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };
  const {
    Franchise,
    franchise_loding,
    franchise_array,
    Inspection,
    inspection_loding,
  } = useUserContext();
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {});
    // Franchise();

    return unsubscribe;
  }, [props]);

  const [getid, SetId] = useState('');

  const NextScreen = id => {
    const formdata = new FormData();
    formdata.append('franchise_id', id);
    Inspection(formdata, props);
    SetId(id);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.whitesomke}}>
      <StatusBar backgroundColor={colors.whitesomke} barStyle="dark-content" />
      <Navbar navigation={props.navigation} />
      <ScrollView>
        <View
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            borderWidth: 0.5,
            borderColor: '#000',
            padding: '10%',
            elevation: 9,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 20}}>
            {/* {totallead} */}3
          </Text>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 16}}>
            Total Franchise
          </Text>
        </View>
        <View
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            borderWidth: 0.5,
            borderColor: '#000',
            padding: '10%',
            elevation: 9,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 20}}>
            {/* {totalleadtoday} */}3
          </Text>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 16}}>
            Total Customers
          </Text>
        </View>
        <View
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            borderWidth: 0.5,
            borderColor: '#000',
            padding: '10%',
            elevation: 9,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 20}}>
            {/* {totalleadmo} */}4
          </Text>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 16}}>
            Total Category
          </Text>
        </View>
        <View
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            borderWidth: 0.5,
            borderColor: '#000',
            padding: '10%',
            elevation: 9,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 20}}>
            {/* {totalleadmo} */}7
          </Text>
          <Text style={{marginBottom: 10, color: colors.black, fontSize: 16}}>
            Total SubCategory
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

// {
//   franchise_loding ? (
//     <IndicatorCom />
//   ) : (
//     <ScrollView>
//       <View
//         style={{
//           marginTop: 20,
//           height: 180,
//           display: 'flex',
//           alignItems: 'center',
//         }}>
//         <Carousel
//           ref={c => {
//             this._carousel = c;
//           }}
//           data={sliderData}
//           renderItem={renderBanner}
//           sliderWidth={windowWidth - 20}
//           itemWidth={300}
//           loop={true}
//           autoplay={true}
//           autoPlayDelay={500}
//         />
//       </View>
//       <View style={{marginHorizontal: '5%'}}>
//         <Text
//           style={{
//             color: colors.black,
//             fontSize: 18,
//             fontWeight: '700',
//             // fontStyle: 'italic',
//             // textDecorationLine: 'underline',
//           }}>
//           Franchise
//         </Text>
//       </View>
//       <View style={{marginHorizontal: '2%', marginBottom: '5%'}}>
//         <FlatList
//           data={franchise_array}
//           // numColumns={3}
//           style={{marginBottom: '20%', marginTop: 10}}
//           renderItem={({item, index}) => {
//             return (
//               <Animatable.View
//                 // style={{margintop: 10}}
//                 animation="bounceInLeft"
//                 style={{
//                   marginHorizontal: '2%',
//                   marginBottom: 10,
//                   borderRadius: 8,
//                   paddingHorizontal: '2%',
//                   backgroundColor: colors.white,
//                   elevation: 5,
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   borderBottomColor: 'red',
//                   borderBottomWidth: 0.2,
//                 }}>
//                 <View
//                   style={{
//                     width: 80,
//                     height: 100,

//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}>
//                   <Image
//                     source={images.fran}
//                     style={{
//                       width: 70,
//                       height: 70,
//                     }}
//                   />
//                 </View>
//                 <View style={{justifyContent: 'center'}}>
//                   <Text
//                     style={{
//                       color: colors.black,
//                       fontSize: 18,
//                       fontWeight: '500',
//                     }}>
//                     {item.franchises.name}
//                   </Text>
//                   <Text
//                     style={{
//                       color: '#808080',
//                       fontSize: 12,
//                     }}>
//                     {item.franchises.email}
//                   </Text>
//                 </View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     // props.navigation.navigate('Subservice');
//                     NextScreen(item.franchise_id);
//                   }}
//                   style={{
//                     width: 50,
//                     height: 50,
//                     borderRadius: 50,
//                     elevation: 5,
//                     backgroundColor: colors.whitesomke,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}>
//                   {inspection_loding === true && item.id == getid ? (
//                     <ActivityIndicator color={colors.blue} size="small" />
//                   ) : (
//                     <MaterialIcons
//                       name="keyboard-arrow-right"
//                       size={40}
//                       color={colors.blue}
//                     />
//                   )}
//                 </TouchableOpacity>
//               </Animatable.View>
//             );
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// }
