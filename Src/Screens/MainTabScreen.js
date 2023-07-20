/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text} from 'react-native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {createDrawerNavigator} from '@react-navigation/drawer';
import colors from '../Utils/colors';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Drewerscreen from '../components/drewercompo';
import Inspection from './Inspection/Inspection';

const Tab = AnimatedTabBarNavigator();
const Drawer = createDrawerNavigator();

const Drawercomponet_Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home_drw"
      screenOptions={{headerShown: false}}
      options={{unmountOnBlur: true}}
      drawerContent={props => <Drewerscreen {...props} />}>
      <Drawer.Screen name="Home_drw" component={Inspection} />
    </Drawer.Navigator>
  );
};

const Drawercomponet_profile = () => {
  return (
    <Drawer.Navigator
      initialRouteName="profile_drw"
      screenOptions={{headerShown: false}}
      options={{unmountOnBlur: true}}
      drawerContent={props => <Drewerscreen {...props} />}>
      <Drawer.Screen name="profile_drw" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.themecolor,
        inactiveTintColor: colors.themecolor,

        labelStyle: {
          color: colors.themecolor,
          fontWeight: '500',
          fontSize: 14,
          marginVertical: 3,
        },

        activeBackgroundColor: '#cce0ff',

        // tabStyle:{
        //   borderTopLeftRadius:30,
        //   borderTopRightRadius:30,
        // }
      }}
      appearance={{
        tabBarBackground: colors.themecolor,
        dotSize: 'small',
        horizontalPadding: 20,
      }}
      // appearance={{ floating: true }}
    >
      <Tab.Screen
        name="Home"
        component={Drawercomponet_Home}
        options={{
          headerShown: false,
          tabBarLabel: 'HOME',
          tabBarIcon: ({focused, color, size}) => (
            <Octicons
              name="home"
              size={size ? 20 : 20}
              color={focused ? colors.themecolor : '#fff'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Drawercomponet_profile}
        options={{
          headerShown: false,
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({focused, color, size}) => (
            <Octicons
              name="person"
              size={size ? 20 : 20}
              color={focused ? colors.themecolor : '#fff'}
              focused={focused}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'SETTING',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="settings"
              size={size ? 26 : 26}
              color={focused ? colors.main : '#222222'}
              focused={focused}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainTabScreen;
