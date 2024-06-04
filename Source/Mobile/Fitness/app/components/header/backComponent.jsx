import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import TextComponent from '../text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

const BackComponent = props => {
  const {skip, nav, filter, title, edit, back, param, data, black, size} =
    props;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          height: 24,
          zIndex: 10,
          backgroundColor: 'transparent',
        }}>
        {back ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(nav, param ? {param: data} : {})
            }>
            <AntDesign
              name="left"
              size={size ? size : 22}
              color={black ? 'black' : 'white'}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <TextComponent
        text={title}
        font={fontFamilies['bebasNeue']}
        size={25}
        color={colors['text-2']}
      />
      {skip ? (
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <TextComponent
            text={'Skip'}
            color={colors['primary-color-black']}
            font={fontFamilies['semibold']}
            size={16}
          />
        </TouchableOpacity>
      ) : filter ? (
        <AntDesign name="filter" size={24} color="black" />
      ) : edit ? (
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default BackComponent;
