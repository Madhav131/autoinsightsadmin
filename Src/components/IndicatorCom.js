import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../Utils/colors';

const IndicatorCom = () => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        elevation: 5,
        height: 45,
        width: 45,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: "5%",
        alignSelf: 'center',
        position: 'absolute',
        top: '10%',
      }}>
      <ActivityIndicator color={colors.blue} />
    </View>
  );
};

export default IndicatorCom;
