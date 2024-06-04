import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import {meal2} from '../../assets';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../../components/common/spaceComponent';

const NotificationScreen = () => {
  return (
    <SafeAreaView>
      <BackComponent black back title={'NOTIFICATIONS'} nav={'Main'} />
      <ScrollView style={{paddingHorizontal: 20, height: '100%'}}>
        <View style={{flexDirection: 'row', gap: 30}}>
          <Image source={meal2} resizeMode="cover" style={styles.image} />
          <View>
            <TextComponent
              text={'Daily steps goal completed'}
              size={16}
              font={fontFamilies['medium']}
            />
            <TextComponent
              text={'Steps: 10000'}
              size={16}
              styles={{marginVertical: 10}}
            />
            <TextComponent
              text={'15 mins ago'}
              size={16}
              font={fontFamilies['regular']}
            />
          </View>
        </View>
        <SpaceComponent height={40} />
        <View style={{flexDirection: 'row', gap: 30}}>
          <Image source={meal2} resizeMode="cover" style={styles.image} />
          <View>
            <TextComponent
              text={'Daily steps goal completed'}
              size={16}
              font={fontFamilies['medium']}
            />
            <TextComponent
              text={'Steps: 10000'}
              size={16}
              styles={{marginVertical: 10}}
            />
            <TextComponent
              text={'15 mins ago'}
              size={16}
              font={fontFamilies['regular']}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
