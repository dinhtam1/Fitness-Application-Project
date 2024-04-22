import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextComponent from '../../components/text/textComponent';
import PaginationComponent from '../../components/common/paginationComponent';
import {splash3} from '../../assets';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {title} from '../../constants/text';

const {width, height} = Dimensions.get('window');

const Splash3Screen = () => {
  return (
    <View style={{position: 'relative'}}>
      <Image source={splash3} style={styles.image} resizeMode="cover" />
      <TextComponent
        text={title['splash3']}
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
      <PaginationComponent number={2} navigate={'Splash4'} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
  },
});

export default Splash3Screen;
