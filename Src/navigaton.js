import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import MainTabScreen from './Screens/MainTabScreen';
import ProfileScreen from './Screens/ProfileScreen';
import HomeScreen from './Screens/HomeScreen';
import Subservice from './Screens/SubService';
import Finalsubmit from './Screens/Finalsubmit';
import Inspection from './Screens/Inspection/Inspection';
import AddInspection from './Screens/Inspection/AddInspection';
import ViewInSpection from './Screens/Inspection/ViewInspection';
import UpdateInspection from './Screens/Inspection/UpdateInspection';
import ChildUpdateIns from './Screens/Inspection/ChildupdateIns';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 400, // Adjust the duration as needed
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 400, // Adjust the duration as needed
      },
    },
  },
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },

          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
    };
  },
};

const navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, ...customTransition}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Subservice" component={Subservice} />
        <Stack.Screen name="Finalsubmit" component={Finalsubmit} />
        <Stack.Screen name="Inspection" component={Inspection} />
        <Stack.Screen name="AddInspection" component={AddInspection} />
        <Stack.Screen name="ViewInSpection" component={ViewInSpection} />
        <Stack.Screen name="UpdateInspection" component={UpdateInspection} />
        <Stack.Screen name="ChildUpdateIns" component={ChildUpdateIns} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default navigation;
