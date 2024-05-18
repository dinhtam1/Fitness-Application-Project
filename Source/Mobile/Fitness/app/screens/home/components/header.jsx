import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import RowComponent from '../../../components/common/rowComponent';
import {Feather} from '@expo/vector-icons';
import {back, splash1} from '../../../assets';
import {MaterialIcons} from '@expo/vector-icons';
import TextComponent from '../../../components/text/textComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import FormField from '../../../components/form/formFieldComponent';
import {header} from '../../../assets';

const {width, height} = Dimensions.get('window');

const Header = ({background, ...props}) => {
  return (
    <>
      {background && (
        <ImageBackground
          source={header}
          style={{
            width: width,
            height: height / 2.8,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}></ImageBackground>
      )}
      <View
        style={
          background
            ? {paddingHorizontal: 20, paddingTop: 30, position: 'absolute'}
            : {
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: 'white',
                elevation: 5,
              }
        }>
        <RowComponent
          justify={'space-between'}
          styles={{
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity>
              <Feather
                name="menu"
                size={26}
                color={background ? 'white' : 'black'}
              />
            </TouchableOpacity>
            <Image source={splash1} resizeMode="cover" style={styles.image} />
          </View>
          <TouchableOpacity>
            <MaterialIcons
              name="notifications-none"
              size={26}
              color={background ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </RowComponent>
        {background && (
          <>
            <TextComponent
              text={'Hello, Good Morning'}
              size={10}
              color={colors['text-white']}
              styles={{marginTop: 15}}
            />
            <TextComponent
              text={'Hieu'}
              font={fontFamilies['medium']}
              size={20}
              color={colors['text-white']}
              styles={{marginTop: 8}}
            />
          </>
        )}
        {background && (
          <FormField
            placeholder={'Search'}
            icon={'search'}
            otherStyles={{marginTop: 0}}
          />
        )}
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
