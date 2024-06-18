import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import TextComponent from '../text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {MaterialIcons} from '@expo/vector-icons';

const BackComponent = props => {
  const {skip, swap, filter, title, edit, back, handleSwap, black, size} =
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
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          height: 24,
          zIndex: 10,
          backgroundColor: 'transparent',
        }}>
        {back ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
      ) : swap ? (
        <TouchableOpacity onPress={() => handleSwap()}>
          <MaterialIcons name="loop" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={{marginLeft: 20}}></View>
      )}
    </View>
  );
};

export default BackComponent;
