import {Button, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {splash1} from '../assets';
import CustomButton from '../components/button/buttonComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';
import TextComponent from '../components/text/textComponent';
import {useNavigation} from '@react-navigation/native';
import {button, title} from '../constants/text';
import {navigator} from '../constants/text';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'relative'}}>
      <Image source={splash1} style={styles.image} resizeMode="cover" />
      <TextComponent
        text={title['splash']}
        color={colors['title']}
        size={24}
        font={fontFamilies['bold']}
        styles={styles.title}
      />
      <TextComponent
        text={title['splash0']}
        color={colors['title']}
        size={16}
        font={fontFamilies['light']}
        styles={styles.text}
      />
      <CustomButton
        title={button['start']}
        containerStyles={styles.button}
        handlePress={() => {
          navigation.navigate(navigator['introduction']);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 200,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 150,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 200,
    backgroundColor: colors['title'],
  },
});

export default SplashScreen;
