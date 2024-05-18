import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BorderComponent = ({color, width, margin}) => {
  return (
    <View
      style={{
        height: 1,
        width: width ?? '100%',
        marginVertical: margin ?? 10,
        backgroundColor: color ?? 'black',
      }}></View>
  );
};

export default BorderComponent;

const styles = StyleSheet.create({});
