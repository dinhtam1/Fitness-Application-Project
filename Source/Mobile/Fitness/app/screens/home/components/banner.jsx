import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {banner, banner1, banner2} from '../../../assets/index';
import {LinearGradient} from 'expo-linear-gradient';
import TextComponent from '../../../components/text/textComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import CustomButton from '../../../components/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const Banner = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={['#5D847D', '#D48103']}></LinearGradient>
      <Image source={banner1} style={styles.people} resizeMode="contain" />
      <TextComponent
        text={'FIT YOUNG MAN DOING BATTLE STRETCH TRAINING'}
        color={colors['text-white']}
        size={15}
        font={fontFamilies['semibold']}
        align={'center'}
        styles={{width: 190, right: 10, top: 40, position: 'absolute'}}
        space={-0.5}
      />
      <CustomButton
        handlePress={() => navigation.navigate('Exercise')}
        title={'Start Exercise'}
        containerStyles={styles.button}
        textStyles={{fontSize: 14, fontFamily: fontFamilies['medium']}}
      />
      <Image source={banner2} style={styles.gym} resizeMode="contain" />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: width - 80,
    height: height / 4,
    marginTop: 30,
    overflow: 'visible',
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  people: {
    position: 'absolute',
    height: 250,
    width: 170,
    transform: [{translateY: -8}],
  },
  button: {
    minHeight: 40,
    position: 'absolute',
    right: 40,
    top: 90,
    paddingHorizontal: 20,
  },
  gym: {
    position: 'absolute',
    height: 80,
    width: 80,
    transform: [{translateY: 150}, {translateX: 180}],
  },
});
