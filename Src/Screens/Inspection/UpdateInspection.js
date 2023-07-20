/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
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
  Modal,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import images from '../../Utils/images';
import * as Animatable from 'react-native-animatable';
import {Dropdown} from 'react-native-element-dropdown';
import RNModal from 'react-native-modal';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  ACCEPT_HEADER,
  add_inspection,
  employee_update_inspection,
  get_customer,
  get_findings_image,
  get_templates,
  get_template_after_image,
  get_template_image,
  get_vin,
} from '../../Utils/baseurl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useUserContext} from '../../Context/user_context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import ImageViewer from 'react-native-image-zoom-viewer';

const UpdateInspection = props => {
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

  const [getdata, SetData] = useState(props.route.params.data);

  const [imagemodal, SetImageModal] = useState(false);
  const [image_index, SetImage_index] = useState(0);
  const [image_url, SetImage_Url] = useState('');

  const [isVisible, setisVisible] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [type, settype] = useState({});
  const [fileName, setfileName] = useState({});
  const [imguri, seturi] = useState(
    props.route.params.data.front_left_image_full_path,
  );
  const [getcondation, SetCondation] = useState(false);

  const [isVisible1, setisVisible1] = useState(false);
  const [filePath1, setFilePath1] = useState({});
  const [type1, settype1] = useState({});
  const [fileName1, setfileName1] = useState({});
  const [imguri1, seturi1] = useState(
    props.route.params.data.front_right_image_full_path,
  );
  const [getcondation1, SetCondation1] = useState(false);

  const [isVisible2, setisVisible2] = useState(false);
  const [filePath2, setFilePath2] = useState({});
  const [type2, settype2] = useState({});
  const [fileName2, setfileName2] = useState({});
  const [imguri2, seturi2] = useState(
    props.route.params.data.back_left_image_full_path,
  );
  const [getcondation2, SetCondation2] = useState(false);

  const [isVisible3, setisVisible3] = useState(false);
  const [filePath3, setFilePath3] = useState({});
  const [type3, settype3] = useState({});
  const [fileName3, setfileName3] = useState({});
  const [imguri3, seturi3] = useState(
    props.route.params.data.back_right_image_full_path,
  );

  const [getcondation3, SetCondation3] = useState(false);

  const [isVisible4, setisVisible4] = useState(false);
  const [filePath4, setFilePath4] = useState({});
  const [type4, settype4] = useState({});
  const [fileName4, setfileName4] = useState({});
  const [file_Name, setfile_Name] = useState('');
  const [imguri4, seturi4] = useState(props.route.params.data.video_full_path);

  const [getcondation4, SetCondation4] = useState(false);

  const {setLogout} = useUserContext();
  const [getcondition2, SetCondition2] = useState(false);
  const [onTheway_show, setOntheway] = useState(false);
  const [getindex, SetIndex] = useState('');
  const [getsubcat, SetSubCat] = useState([]);
  const [paused, setPaused] = useState(true);

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath(response);
        seturi(response.assets[0].uri);

        settype(response.assets[0].type);
        setfileName(response.assets[0].fileName);
        setisVisible(!isVisible);
        SetCondation(true);
      });
    }
  };
  const captureImage1 = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath1(response);
        seturi1(response.assets[0].uri);

        settype1(response.assets[0].type);
        setfileName1(response.assets[0].fileName);
        setisVisible1(!isVisible1);
        SetCondation1(true);
      });
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const captureImage2 = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath2(response);
        seturi2(response.assets[0].uri);

        settype2(response.assets[0].type);
        setfileName2(response.assets[0].fileName);
        setisVisible2(!isVisible2);
        SetCondation2(true);
      });
    }
  };
  const captureImage3 = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath3(response);
        seturi3(response.assets[0].uri);

        settype3(response.assets[0].type);
        setfileName3(response.assets[0].fileName);
        setisVisible3(!isVisible3);
        SetCondation3(true);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath(response);
      seturi(response.assets[0].uri);

      settype(response.assets[0].type);
      setfileName(response.assets[0].fileName);
      setisVisible(!isVisible);
      SetCondation(true);
    });
  };
  const chooseFile1 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath1(response);
      seturi1(response.assets[0].uri);

      settype1(response.assets[0].type);
      setfileName1(response.assets[0].fileName);
      setisVisible1(!isVisible1);
      SetCondation1(true);
    });
  };
  const chooseFile2 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath2(response);
      seturi2(response.assets[0].uri);

      settype2(response.assets[0].type);
      setfileName2(response.assets[0].fileName);
      setisVisible2(!isVisible2);
      SetCondation2(true);
    });
  };
  const chooseFile3 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath3(response);
      seturi3(response.assets[0].uri);

      settype3(response.assets[0].type);
      setfileName3(response.assets[0].fileName);
      setisVisible3(!isVisible3);
      SetCondation3(true);
    });
  };
  const chooseFile4 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath4(response);
      seturi4(response.assets[0].uri);

      settype4(response.assets[0].type);
      setfileName4(response.assets[0].fileName);
      setfile_Name(response.assets[0].fileName);
      setisVisible4(!isVisible4);
      SetCondation4(true);
    });
  };

  const removephoto = async id => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(get_template_image + id, {
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
          Toast.show(res.data.msg);
          props.navigation.replace('Inspection');
        } else {
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const removephoto1 = async id => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(get_template_after_image + id, {
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
          Toast.show(res.data.msg);
          props.navigation.replace('Inspection');
        } else {
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const removephoto2 = async id => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(get_findings_image + id, {
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
          Toast.show(res.data.msg);
          props.navigation.replace('Inspection');
        } else {
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const Updatechild = async () => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', getdata.id);
    var img = {uri: imguri, name: fileName, type: type};
    var img1 = {uri: imguri1, name: fileName1, type: type1};
    var img2 = {uri: imguri2, name: fileName2, type: type2};
    var img3 = {uri: imguri3, name: fileName3, type: type3};
    var img4 = {uri: imguri4, name: fileName4, type: type4};
    if (getcondation === true) {
      formdata.append('front_left_image', img);
    }
    if (getcondation1 === true) {
      formdata.append('front_right_image', img1);
    }
    if (getcondation2 === true) {
      formdata.append('back_right_image', img2);
    }
    if (getcondation3 === true) {
      formdata.append('back_left_image', img3);
    }
    if (getcondation4 === true) {
      formdata.append('video_upload', img4);
    }

    console.log('formdata', formdata);
    axios
      .post(employee_update_inspection, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        console.log('ress', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.success === 1) {
          // console.log('ress', res.data);
          Toast.show('success...!!!');
          props.navigation.replace('Inspection');
        } else {
        }
      })
      .catch(err => {
        console.log('err11', err);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.whitesomke,
      }}>
      <StatusBar backgroundColor={colors.themecolor} barStyle="light-content" />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: '2%',
          paddingVertical: metrics.HEIGHT * 0.01,
          elevation: 5,
          backgroundColor: colors.themecolor,
          marginTop: Platform.OS === 'ios' ? '10%' : 0,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', left: '10%'}}
          onPress={() => props.navigation.replace('MainTabScreen')}>
          <Ionicons name="arrow-back" size={35} color={colors.white} />
        </TouchableOpacity>

        {/* <View
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
        </TouchableOpacity> */}
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '4%',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Front Left Image:
          </Text>

          {imguri === null || imguri === '' ? (
            <TouchableOpacity
              onPress={() => {
                setisVisible(true);
              }}
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                //   borderColor: colors.themecolor,
                //   borderWidth: 2,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.2,
                alignSelf: 'center',
              }}>
              <Text style={{color: colors.black, fontSize: 22}}>+</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                //   borderColor: colors.themecolor,
                //   borderWidth: 2,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.28,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  SetImageModal(true);
                  SetImage_Url(imguri);
                }}>
                <Image
                  source={{uri: imguri}}
                  style={{
                    width: metrics.WIDTH * 0.88,
                    height: metrics.HEIGHT * 0.18,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setisVisible(true);
                }}
                style={{
                  width: metrics.WIDTH * 0.24,
                  borderRadius: 13,
                  flexDirection: 'row',
                  backgroundColor: colors.themecolor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: '500',
                    fontSize: 12,
                    marginRight: 5,
                  }}>
                  EDIT
                </Text>
                <MaterialIcons name="edit" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '8%',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Front Right Image:
          </Text>

          {imguri1 === null || imguri1 === '' ? (
            <TouchableOpacity
              onPress={() => {
                setisVisible1(true);
              }}
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.2,
                alignSelf: 'center',
              }}>
              <Text style={{color: colors.black, fontSize: 22}}>+</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.28,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  SetImageModal(true);
                  SetImage_Url(imguri1);
                }}>
                <Image
                  source={{uri: imguri1}}
                  style={{
                    width: metrics.WIDTH * 0.88,
                    height: metrics.HEIGHT * 0.18,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setisVisible1(true);
                }}
                style={{
                  width: metrics.WIDTH * 0.24,
                  borderRadius: 13,
                  flexDirection: 'row',
                  backgroundColor: colors.themecolor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: '500',
                    fontSize: 12,
                    marginRight: 5,
                  }}>
                  EDIT
                </Text>
                <MaterialIcons name="edit" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '8%',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Back Left Image:
          </Text>

          {imguri2 === null || imguri2 === '' ? (
            <TouchableOpacity
              onPress={() => {
                setisVisible2(true);
              }}
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.2,
                alignSelf: 'center',
              }}>
              <Text style={{color: colors.black, fontSize: 22}}>+</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.28,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  SetImageModal(true);
                  SetImage_Url(imguri2);
                }}>
                <Image
                  source={{uri: imguri2}}
                  style={{
                    width: metrics.WIDTH * 0.88,
                    height: metrics.HEIGHT * 0.18,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setisVisible2(true);
                }}
                style={{
                  width: metrics.WIDTH * 0.24,
                  borderRadius: 13,
                  flexDirection: 'row',
                  backgroundColor: colors.themecolor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: '500',
                    fontSize: 12,
                    marginRight: 5,
                  }}>
                  EDIT
                </Text>
                <MaterialIcons name="edit" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '8%',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Back Right Image:
          </Text>

          {imguri3 === null || imguri3 === '' ? (
            <TouchableOpacity
              onPress={() => {
                setisVisible3(true);
              }}
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.2,
                alignSelf: 'center',
              }}>
              <Text style={{color: colors.black, fontSize: 22}}>+</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                //   borderColor: colors.themecolor,
                //   borderWidth: 2,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.28,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  SetImageModal(true);
                  SetImage_Url(imguri3);
                }}>
                <Image
                  source={{uri: imguri3}}
                  style={{
                    width: metrics.WIDTH * 0.88,
                    height: metrics.HEIGHT * 0.18,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setisVisible3(true);
                }}
                style={{
                  width: metrics.WIDTH * 0.24,
                  borderRadius: 13,
                  flexDirection: 'row',
                  backgroundColor: colors.themecolor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: '500',
                    fontSize: 12,
                    marginRight: 5,
                  }}>
                  EDIT
                </Text>
                <MaterialIcons name="edit" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '8%',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Video upload:
          </Text>
          {getdata.video_upload === null ? (
            <TouchableOpacity
              onPress={() => {
                setisVisible4(true);
              }}
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                //   borderColor: colors.themecolor,
                //   borderWidth: 2,
                width: metrics.WIDTH * 0.9,
                backgroundColor: colors.white,
                height: metrics.HEIGHT * 0.2,
                alignSelf: 'center',
              }}>
              <Text style={{color: colors.black, fontSize: 22}}>+</Text>
            </TouchableOpacity>
          ) : (
            // {file_Name === '' ? null : (
            //   <Text
            //     style={{
            //       color: colors.black,
            //       fontSize: 16,
            //       fontWeight: '500',
            //     }}>
            //     {file_Name}
            //   </Text>
            // )}
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#c0bfbf',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4%',
                borderRadius: 10,
                //   borderColor: colors.themecolor,
                //   borderWidth: 2,
                backgroundColor: colors.white,
                width: metrics.WIDTH * 0.9,
                height: metrics.HEIGHT * 0.28,
                alignSelf: 'center',
              }}>
              <Video
                source={{
                  uri: getdata.video_full_path,
                }}
                volume={50}
                // onError={err => console.log('errr', err)}
                style={{
                  width: metrics.WIDTH * 0.85,
                  height: metrics.HEIGHT * 0.2,
                  backgroundColor: 'black',
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
              <TouchableOpacity
                onPress={() => {
                  setisVisible4(true);
                }}
                style={{
                  width: metrics.WIDTH * 0.24,
                  borderRadius: 13,
                  flexDirection: 'row',
                  backgroundColor: colors.themecolor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: '500',
                    fontSize: 12,
                    marginRight: 5,
                  }}>
                  EDIT
                </Text>
                <MaterialIcons name="edit" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            backgroundColor: colors.white,
            marginHorizontal: '2%',
            padding: '3%',
            elevation: 3,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              SetCondition2(!getcondition2);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: 20,
                fontWeight: '600',
              }}>
              Findings
            </Text>
            <AntDesign
              name={getcondition2 === true ? 'caretup' : 'caretdown'}
              color={colors.black}
              size={25}
            />
          </TouchableOpacity>
          {getcondition2 === true ? (
            <>
              <FlatList
                data={getdata.category_id}
                style={{
                  marginBottom: '3%',
                }}
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
                                      backgroundColor:
                                        item.status === 1
                                          ? '#CFF4F0'
                                          : item.status === 2
                                          ? '#FFF07F'
                                          : item.status === 3
                                          ? '#FEC5C5'
                                          : colors.whitesomke,
                                      padding: 10,
                                      borderRadius: 5,
                                      marginBottom: 15,
                                    }}>
                                    <View
                                      style={
                                        {
                                          // backgroundColor: colors.whitesomke,
                                        }
                                      }>
                                      <Text
                                        style={{
                                          color: colors.themecolor,
                                          fontSize: 15,
                                          padding: 2,
                                          fontWeight: '600',
                                        }}>
                                        {item.sub_category.name}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        marginTop: '6%',
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
                                          paddingVertical: 2,
                                        }}>
                                        {item.note}
                                      </Text>
                                      <FlatList
                                        data={item.image}
                                        horizontal={true}
                                        style={{
                                          marginTop: '1%',
                                          marginBottom: '2%',
                                        }}
                                        renderItem={({item, index}) => {
                                          return (
                                            <View
                                              style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 6,
                                                width: 130,
                                                backgroundColor: colors.white,
                                                height: 130,
                                                marginLeft: 10,
                                                alignSelf: 'center',
                                                elevation: 5,
                                              }}>
                                              <TouchableOpacity
                                                onPress={() => {
                                                  SetImageModal(true);
                                                  SetImage_index(index);
                                                  SetImage_Url(
                                                    item.image_full_path,
                                                  );
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
                                              <TouchableOpacity
                                                onPress={() =>
                                                  removephoto(item.id)
                                                }
                                                style={{
                                                  backgroundColor:
                                                    colors.themecolor,
                                                  width: 110,
                                                  marginVertical: '4%',
                                                  elevation: 3,
                                                  borderRadius: 5,
                                                }}>
                                                <Text
                                                  style={{
                                                    color: colors.white,
                                                    textAlign: 'center',
                                                    paddingVertical: 3,
                                                  }}>
                                                  delete
                                                </Text>
                                              </TouchableOpacity>
                                            </View>
                                          );
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                          marginTop: '6%',
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
                                          marginTop: '1%',
                                          marginBottom: '2%',
                                        }}
                                        renderItem={({item, index}) => {
                                          return (
                                            <View
                                              style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 6,
                                                width: 130,
                                                backgroundColor: colors.white,
                                                height: 130,
                                                marginLeft: 10,
                                                alignSelf: 'center',
                                                elevation: 5,
                                              }}>
                                              <TouchableOpacity
                                                onPress={() => {
                                                  SetImageModal(true);
                                                  SetImage_index(index);
                                                  SetImage_Url(
                                                    item.image_full_path,
                                                  );
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
                                              <TouchableOpacity
                                                onPress={() =>
                                                  removephoto1(item.id)
                                                }
                                                style={{
                                                  backgroundColor:
                                                    colors.themecolor,
                                                  width: 110,
                                                  marginVertical: '4%',
                                                  elevation: 3,
                                                  borderRadius: 5,
                                                }}>
                                                <Text
                                                  style={{
                                                    color: colors.white,
                                                    textAlign: 'center',
                                                    paddingVertical: 3,
                                                  }}>
                                                  delete
                                                </Text>
                                              </TouchableOpacity>
                                            </View>
                                          );
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: colors.black,
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                          marginTop: '6%',
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
                                          marginTop: '1%',
                                          marginBottom: '2%',
                                        }}
                                        renderItem={({item, index}) => {
                                          return (
                                            <View
                                              style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 6,
                                                width: 130,
                                                backgroundColor: colors.white,
                                                height: 130,
                                                marginLeft: 10,
                                                alignSelf: 'center',
                                                elevation: 5,
                                              }}>
                                              <TouchableOpacity
                                                onPress={() => {
                                                  SetImageModal(true);
                                                  SetImage_index(index);
                                                  SetImage_Url(
                                                    item.image_full_path,
                                                  );
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
                                              <TouchableOpacity
                                                onPress={() =>
                                                  removephoto2(item.id)
                                                }
                                                style={{
                                                  backgroundColor:
                                                    colors.themecolor,
                                                  width: 110,
                                                  marginVertical: '4%',
                                                  elevation: 3,
                                                  borderRadius: 5,
                                                }}>
                                                <Text
                                                  style={{
                                                    color: colors.white,
                                                    textAlign: 'center',
                                                    paddingVertical: 3,
                                                  }}>
                                                  delete
                                                </Text>
                                              </TouchableOpacity>
                                            </View>
                                          );
                                        }}
                                      />
                                    </View>
                                    <TouchableOpacity
                                      onPress={() => {
                                        props.navigation.navigate(
                                          'ChildUpdateIns',
                                          {
                                            childdata: item,
                                            status: getdata.status,
                                            ins_id: getdata.id,
                                          },
                                        );
                                      }}
                                      style={{
                                        marginTop: metrics.HEIGHT * 0.02,
                                        alignItems: 'center',

                                        marginHorizontal: '5%',
                                        borderRadius: 8,
                                        backgroundColor: colors.themecolor,
                                        height: metrics.HEIGHT * 0.05,
                                        width: '25%',
                                        alignSelf: 'flex-end',
                                        marginBottom: '4%',
                                        justifyContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          color: colors.white,
                                          fontSize: 16,
                                          fontWeight: '600',
                                        }}>
                                        Update
                                      </Text>
                                    </TouchableOpacity>
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
                              backgroundColor: colors.white,
                              borderWidth: 0.5,
                              borderColor: '#c0bfbf',
                              padding: 10,
                              borderRadius: 5,
                              elevation: 2,
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
        <TouchableOpacity
          onPress={() => Updatechild()}
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            alignItems: 'center',

            marginHorizontal: '4%',
            borderRadius: 8,
            backgroundColor: colors.themecolor,
            height: metrics.HEIGHT * 0.06,

            marginBottom: '4%',
            justifyContent: 'center',
          }}>
          {/* {isloading === true ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : ( */}
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Update
          </Text>
          {/* )} */}
        </TouchableOpacity>
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
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setisVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              height: metrics.HEIGHT * 0.3,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.themecolor,
                }}>
                Add Picture
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => chooseFile('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <MaterialIcons color={colors.black} name="photo" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => captureImage('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <Entypo color={colors.black} name="camera" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Take A Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setisVisible(false);
              }}
              style={{
                marginTop: '5%',
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                borderRadius: 5,
                backgroundColor: colors.themecolor,
              }}>
              <Text
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                CANCLE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isVisible1}
        onRequestClose={() => {
          setisVisible1(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              height: metrics.HEIGHT * 0.3,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.themecolor,
                }}>
                Add Picture
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => chooseFile1('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <MaterialIcons color={colors.black} name="photo" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => captureImage1('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <Entypo color={colors.black} name="camera" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Take A Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setisVisible1(false);
              }}
              style={{
                marginTop: '5%',
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                borderRadius: 7,
                backgroundColor: colors.themecolor,
              }}>
              <Text
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                CANCLE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isVisible2}
        onRequestClose={() => {
          setisVisible2(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              height: metrics.HEIGHT * 0.3,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.themecolor,
                }}>
                Add Picture
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => chooseFile2('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <MaterialIcons color={colors.black} name="photo" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => captureImage2('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <Entypo color={colors.black} name="camera" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Take A Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setisVisible2(false);
              }}
              style={{
                marginTop: '5%',
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                borderRadius: 7,
                backgroundColor: colors.themecolor,
              }}>
              <Text
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                CANCLE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isVisible3}
        onRequestClose={() => {
          setisVisible3(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              height: metrics.HEIGHT * 0.3,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.themecolor,
                }}>
                Add Picture
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => chooseFile3('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <MaterialIcons color={colors.black} name="photo" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => captureImage3('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <Entypo color={colors.black} name="camera" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Take A Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setisVisible3(false);
              }}
              style={{
                marginTop: '5%',
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                borderRadius: 7,
                backgroundColor: colors.themecolor,
              }}>
              <Text
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                CANCLE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isVisible4}
        onRequestClose={() => {
          setisVisible4(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              height: metrics.HEIGHT * 0.3,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.themecolor,
                }}>
                Add Video
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => chooseFile4('video')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <MaterialIcons color={colors.black} name="photo" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setisVisible4(false);
              }}
              style={{
                marginTop: '5%',
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                borderRadius: 7,
                backgroundColor: colors.themecolor,
              }}>
              <Text
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                CANCLE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default UpdateInspection;
