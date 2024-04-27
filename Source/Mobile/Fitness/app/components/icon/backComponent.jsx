import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import TextComponent from '../text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
const BackComponent = props => {
  const {skip, nav} = props;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          height: 24,
          zIndex: 10,
          backgroundColor: 'transparent',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(nav);
          }}>
          <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
      </View>
      {skip && (
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <TextComponent
            text={'Skip'}
            color={colors['primary-color-black']}
            font={fontFamilies['semibold']}
            size={16}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackComponent;
