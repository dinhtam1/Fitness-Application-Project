import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {splash2} from '../../assets';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import PaginationComponent from '../../components/common/paginationComponent';

const {width, height} = Dimensions.get('window');

const Splash2Screen = () => {
  return (
    <View style={{position: 'relative'}}>
      <Image source={splash2} style={styles.image} resizeMode="cover" />
      <TextComponent
        text="PERFECT BODY DOING CROSSFIT EXERCISES"
        color={colors['title']}
        size={24}
        font={fontFamilies['bold']}
        styles={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 150,
          width: 240,
          textAlign: 'center',
        }}
      />
      <PaginationComponent number={1} navigate={'Splash3'} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
  },
});

export default Splash2Screen;
