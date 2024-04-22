import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import PaginationComponent from '../../components/common/paginationComponent';
import {splash4} from '../../assets';

const {width, height} = Dimensions.get('window');

const Splash4Screen = () => {
  return (
    <View style={{position: 'relative'}}>
      <Image source={splash4} style={styles.image} resizeMode="cover" />
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
      <PaginationComponent number={3} navigate={'SignIn'} />
    </View>
  );
};

export default Splash4Screen;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
  },
});
