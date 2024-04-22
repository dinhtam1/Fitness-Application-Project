import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
const BackComponent = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        left: 20,
        top: 20,
        width: '100%',
        height: 22,
        zIndex: 10,
        marginTop: 20,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <AntDesign name="left" size={22} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BackComponent;
