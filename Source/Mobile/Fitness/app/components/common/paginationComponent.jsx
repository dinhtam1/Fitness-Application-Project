import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontFamilies} from '../../constants/fontFamilies';
import CustomButton from '../button/buttonComponent';
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const PaginationComponent = props => {
  const navigation = useNavigation();
  const {flex, position, styles, justifyContent, number, navigate} = props;
  return (
    <View
      style={[
        {
          position: position ?? 'absolute',
          flex: flex ?? 0,
          justifyContent: justifyContent ?? 'space-between',
          flexDirection: 'row',
          bottom: 20,
          paddingHorizontal: 20,
          width: '100%',
        },
        styles,
      ]}>
      <CustomButton
        handlePress={() => navigation.navigate('SignIn')}
        title="SKIP"
        containerStyles={{backgroundColor: 'transparent'}}
        textStyles={{
          color: colors['title'],
          fontSize: 18,
          fontFamily: fontFamilies['semibold'],
        }}
      />
      <View style={Styles.dotContainer}>
        {[...Array(3).keys()].map((_, index) => (
          <View
            key={index}
            style={index === number - 1 ? Styles.dot_primary : Styles.dot}
          />
        ))}
      </View>
      <CustomButton
        handlePress={() => navigation.navigate(navigate)}
        title="NEXT"
        containerStyles={{backgroundColor: 'transparent'}}
        textStyles={{
          color: colors['title'],
          fontSize: 18,
          fontFamily: fontFamilies['semibold'],
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors['title'],
    marginHorizontal: 5,
  },
  dot_primary: {
    backgroundColor: colors['primary-color'],
    width: 16,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default PaginationComponent;
