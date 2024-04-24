import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {splash1} from '../assets';
import CustomButton from '../components/button/buttonComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';
import TextComponent from '../components/text/textComponent';
import {useNavigation} from '@react-navigation/native';
import {title} from '../constants/text';

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
        styles={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 200,
        }}
      />
      <TextComponent
        text="We train your body to be great and fit."
        color={colors['title']}
        size={16}
        font={fontFamilies['light']}
        styles={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 150,
        }}
      />
      <CustomButton
        title={`LET'S START`}
        containerStyles={{
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          width: 200,
          backgroundColor: colors['title'],
        }}
        handlePress={() => {
          navigation.navigate('Introduce');
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
});

export default SplashScreen;
