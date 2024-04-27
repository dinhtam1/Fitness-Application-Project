import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SpaceComponent = props => {
  const {height, width} = props;
  return <View style={{width, height}}></View>;
};

export default SpaceComponent;
