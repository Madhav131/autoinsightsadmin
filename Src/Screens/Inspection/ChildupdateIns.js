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
  Modal,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import images from '../../Utils/images';
import * as Animatable from 'react-native-animatable';
import {Dropdown} from 'react-native-element-dropdown';

import RNModal from 'react-native-modal';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {
  ACCEPT_HEADER,
  add_inspection,
  get_customer,
  get_subfindings,
  get_templates,
  get_vin,
  update_findings,
} from '../../Utils/baseurl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useUserContext} from '../../Context/user_context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const data = [
  {id: 1, name: 'Success', bg: '#1DC9B7'},
  {id: 2, name: 'Warning', bg: '#FFB822'},
  {id: 3, name: 'Danger', bg: '#FD27EB'},
];

const ChildUpdateIns = props => {
  const {setLogout} = useUserContext();
  const [statusmodel, setstatusmodal] = useState(false);
  const [getdata, SetData] = useState(props.route.params.childdata);
  const [getupload, setupload] = useState(props.route.params.status);
  const [getins_id, SetIns_Id] = useState(props.route.params.ins_id);

  const [isVisible, setisVisible] = useState(false);
  const [image_array, SetImage_array] = useState([]);

  const [isVisible1, setisVisible1] = useState(false);
  const [image_array1, SetImage_array1] = useState([]);

  const [isVisible2, setisVisible2] = useState(false);
  const [image_array2, SetImage_array2] = useState([]);

  const [getfristinput, SetFristInput] = useState(
    props.route.params.childdata.note,
  );
  const [getsecondinput, SetSecondInput] = useState(
    props.route.params.childdata.after_note,
  );
  const [getthredinput, SetThredInput] = useState(
    props.route.params.childdata.findings_remark,
  );

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getdropdown();
    });
    return unsubscribe;
  }, [props]);

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
        SetImage_array(response.assets);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        // setFilePath(response);
        // seturi(response.assets[0].uri);

        // settype(response.assets[0].type);
        // setfileName(response.assets[0].fileName);
        setisVisible(!isVisible);
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
        SetImage_array1(response.assets);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath1(response);
        seturi1(response.assets[0].uri);

        settype1(response.assets[0].type);
        setfileName1(response.assets[0].fileName);
        setisVisible1(!isVisible1);
      });
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
        SetImage_array2(response.assets);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath2(response);
        seturi2(response.assets[0].uri);

        settype2(response.assets[0].type);
        setfileName2(response.assets[0].fileName);
        setisVisible2(!isVisible2);
      });
    }
  };
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
      selectionLimit: 0,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      SetImage_array(response.assets);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      //   setFilePath(response);
      //   seturi(response.assets[0].uri);

      //   settype(response.assets[0].type);
      //   setfileName(response.assets[0].fileName);
      setisVisible(!isVisible);
    });
  };
  const chooseFile1 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
      selectionLimit: 0,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      SetImage_array1(response.assets);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      //   setFilePath1(response);
      //   seturi1(response.assets[0].uri);

      //   settype1(response.assets[0].type);
      //   setfileName1(response.assets[0].fileName);
      setisVisible1(!isVisible1);
    });
  };
  const chooseFile2 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
      selectionLimit: 0,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      SetImage_array2(response.assets);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      //   setFilePath2(response);
      //   seturi2(response.assets[0].uri);

      //   settype2(response.assets[0].type);
      //   setfileName2(response.assets[0].fileName);
      setisVisible2(!isVisible2);
    });
  };

  const removephoto = index => {
    let result = image_array.filter((item, key) => key != index);
    SetImage_array(result);
  };

  const removephoto1 = index => {
    let result = image_array1.filter((item, key) => key != index);
    SetImage_array1(result);
  };
  const removephoto2 = index => {
    let result = image_array2.filter((item, key) => key != index);
    SetImage_array2(result);
  };

  const Updatechild = async () => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', getins_id);
    formdata.append('subcategory_id', getdata.subcategory_id);
    formdata.append('status', getupload);
    formdata.append('note', getfristinput);
    formdata.append('after_note', getsecondinput);
    formdata.append('rec_id', value);

    formdata.append('findings_remark', getthredinput);
    for (var i = 0; i < image_array.length; i++) {
      formdata.append('image[ ' + getdata.subcategory_id + '][' + i + ']', {
        uri: image_array[i].uri,
        name: image_array[i].fileName,
        type: image_array[i].type,
      });
    }
    for (var i = 0; i < image_array1.length; i++) {
      formdata.append(
        'after_image[ ' + getdata.subcategory_id + '][' + i + ']',
        {
          uri: image_array1[i].uri,
          name: image_array1[i].fileName,
          type: image_array1[i].type,
        },
      );
    }
    for (var i = 0; i < image_array2.length; i++) {
      formdata.append('findings[ ' + getdata.subcategory_id + '][' + i + ']', {
        uri: image_array2[i].uri,
        name: image_array2[i].fileName,
        type: image_array2[i].type,
      });
    }

    console.log('formdata', formdata);
    axios
      .post(update_findings, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('ress', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.status == 1) {
          //   console.log('ress', res.data);
          Toast.show('success...!!!');
          props.navigation.replace('Inspection');
        } else {
        }
      })
      .catch(err => {
        console.log('err11', err);
      });
  };

  const [getdrop, SetDrop] = useState([]);
  const [value, setValue] = useState(
    getdata.rec_id === null ? '' : getdata.rec_id,
  );

  const [open, setOpen] = useState();
  const [items, setItems] = useState(
    getdata.rec_id === null
      ? 'Select'
      : getdata.subfindings.recommendations.recommendations,
  );
  const getdropdown = async () => {
    console.log('rrrrrr', JSON.stringify(getdata, null, 2));
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(get_subfindings + getdata.subcategory_id, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        console.log('getdropdown', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.success == 1) {
          SetDrop(res.data.data);
          console.log('getdropdown', res.data);
        } else {
          null;
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
          elevation: 5,
          backgroundColor: colors.themecolor,
          marginTop: Platform.OS === 'ios' ? '10%' : 0,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', left: '10%'}}
          onPress={() => props.navigation.goBack(null)}>
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
      <ScrollView style={{}}>
        <View style={{marginHorizontal: '3%'}}>
          <View
            style={{
              marginTop: '6%',
              flexDirection: 'row',
              marginBottom: '4%',
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
                fontSize: 20,
                fontWeight: '500',
              }}>
              {getdata.sub_category.name}
            </Text>
            {/* <AntDesign
            name={getcondition === true ? 'caretup' : 'caretdown'}
            color={colors.black}
            size={25}
          /> */}
          </View>

          <View>
            <FlatList
              data={data}
              listKey={(item, index) => 'U' + index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '8%',
                      marginTop: '2%',
                      marginBottom: '2%',
                      // height: metrics.HEIGHT * 0.04,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setupload(item.id)}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          backgroundColor: item.bg,
                          height: 22,
                          width: 22,
                          justifyContent: 'center',
                          borderRadius: 22,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 15,
                            color: colors.white,
                            fontWeight: '700',
                          }}>
                          {getupload == item.id ? (
                            <View
                              style={{
                                backgroundColor: colors.white,
                                height: 10,
                                width: 10,
                                justifyContent: 'center',
                                borderRadius: 10,
                              }}
                            />
                          ) : null}
                        </Text>
                      </View>
                      <View style={{marginLeft: '5%'}}>
                        <Text
                          style={{
                            color: colors.black,
                            fontWeight: '700',
                            fontSize: 13,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              numColumns={3}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.ttxt}>Before Inspection:-</Text>
            <View style={styles.inputview}>
              <TextInput
                placeholder="Enter Before Inspection"
                style={styles.txtinput}
                onChangeText={val => {
                  SetFristInput(val);
                }}
                value={getfristinput}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setisVisible(true);
              }}
              style={styles.addbtn}>
              <Text style={styles.btntxt}>Add Photo</Text>
              <FontAwesome name="photo" color={colors.white} size={17} />
            </TouchableOpacity>
            {image_array.length === 0 ? null : (
              <View style={styles.imgview}>
                <FlatList
                  data={image_array}
                  horizontal={true}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.imgcontainer}>
                        <ImageBackground
                          source={{uri: item.uri}}
                          style={styles.img}
                          imageStyle={{borderRadius: 5}}
                        />
                        <TouchableOpacity
                          onPress={() => removephoto(index)}
                          style={styles.dlbtn}>
                          <Text style={styles.dltxt}>delete</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>
          <View style={styles.container}>
            <Text style={styles.ttxt}>After Inspection:-</Text>
            <View style={styles.inputview}>
              <TextInput
                placeholder="Enter After Inspection"
                placeholderTextColor={colors.textgrey}
                style={styles.txtinput}
                onChangeText={val => {
                  SetSecondInput(val);
                }}
                value={getsecondinput}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setisVisible1(true);
              }}
              style={styles.addbtn}>
              <Text style={styles.btntxt}>Add Photo</Text>
              <FontAwesome name="photo" color={colors.white} size={17} />
            </TouchableOpacity>
            <View style={styles.imgview}>
              <FlatList
                data={image_array1}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.imgcontainer}>
                      <ImageBackground
                        source={{uri: item.uri}}
                        style={styles.img}
                      />
                      <TouchableOpacity
                        onPress={() => removephoto1(index)}
                        style={styles.dlbtn}>
                        <Text style={styles.dltxt}>delete</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.ttxt}>Findings Inspection:-</Text>
            <View style={styles.inputview}>
              <TextInput
                placeholder="Enter Findings Inspection"
                placeholderTextColor={colors.textgrey}
                style={styles.txtinput}
                onChangeText={val => {
                  SetThredInput(val);
                }}
                value={getthredinput}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setisVisible2(true);
              }}
              style={styles.addbtn}>
              <Text style={styles.btntxt}>Add Photo</Text>
              <FontAwesome name="photo" color={colors.white} size={17} />
            </TouchableOpacity>
            <View style={styles.imgview}>
              <FlatList
                data={image_array2}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.imgcontainer}>
                      <ImageBackground
                        source={{uri: item.uri}}
                        style={styles.img}
                      />
                      <TouchableOpacity
                        onPress={() => removephoto2(index)}
                        style={styles.dlbtn}>
                        <Text style={styles.dltxt}>delete</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setstatusmodal(true)}
            style={styles.container}>
            <Text
              style={{
                color: colors.black,
                fontSize: 18,
                // fontWeight: '200=',
              }}>
              {items}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Updatechild()}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              alignItems: 'center',

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
        </View>
      </ScrollView>
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
              height: metrics.HEIGHT * 0.4,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.black,
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
              }}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.black,
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
              height: metrics.HEIGHT * 0.4,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.black,
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
              }}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.black,
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
              height: metrics.HEIGHT * 0.4,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                  color: colors.black,
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
              }}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.022,
                  fontWeight: 'bold',
                  color: colors.black,
                }}>
                CANCLE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <RNModal
        animationType="slide"
        transparent={true}
        isVisible={statusmodel}
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
            width: metrics.WIDTH * 0.8,
            alignSelf: 'center',
            marginTop: '10%',
            marginBottom: '10%',
            paddingTop: 15,
            elevation: 3,
          }}>
          <FlatList
            data={getdrop}
            renderItem={({item, index}) => {
              return (
                <View style={{paddingBottom: '5%', marginHorizontal: '5%'}}>
                  <Text style={{color: '#808080', fontWeight: 'bold'}}>
                    {item.findings}
                  </Text>
                  <FlatList
                    data={item.recommendations}
                    style={{
                      marginTop: '5%',
                    }}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setValue(item.id);
                            setItems(item.recommendations);
                            setstatusmodal(false);
                          }}
                          style={{paddingBottom: '5%', marginHorizontal: '5%'}}>
                          <Text
                            style={{color: colors.black, fontWeight: 'bold'}}>
                            {item.recommendations}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: '6%',
    padding: '4%',
    borderColor: '#c0bfbf',
    borderWidth: 0.5,
  },
  ttxt: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '500',
    marginBottom: '2%',
  },
  inputview: {
    marginTop: metrics.HEIGHT * 0.01,
    borderRadius: 10,
    borderColor: '#c0bfbf',
    borderWidth: 0.8,
    backgroundColor: colors.white,
  },
  txtinput: {
    color: colors.black,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  addbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    borderRadius: 7,
    //   borderColor: colors.themecolor,
    //   borderWidth: 2,
    backgroundColor: colors.themecolor,
    width: metrics.WIDTH * 0.35,
    height: metrics.HEIGHT * 0.05,
  },
  btntxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
    marginRight: 10,
  },
  imgview: {
    marginTop: '5%',
    marginLeft: '1%',
    // height: metrics.HEIGHT * 0.2,
  },
  imgcontainer: {
    marginRight: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0bfbf',
    borderWidth: 2,
    width: 130,
    backgroundColor: colors.white,
    height: 115,
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  img: {
    width: 110,
    height: 70,
    alignSelf: 'center',
  },
  dlbtn: {
    backgroundColor: colors.themecolor,
    width: 110,
    marginTop: '5%',
    elevation: 3,
    borderRadius: 5,
  },
  dltxt: {
    color: colors.white,
    textAlign: 'center',
    paddingVertical: 2,
  },
});
export default ChildUpdateIns;
