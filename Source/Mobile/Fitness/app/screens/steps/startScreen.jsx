import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import SpaceComponent from '../../components/common/spaceComponent';
import TextComponent from '../../components/text/textComponent';
import CustomButton from '../../components/button/buttonComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import {button, step, text} from '../../constants/text';
import {useNavigation} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';

const StartScreen = () => {
  const navigation = useNavigation();

  const image = require('../../assets/images/start.png');
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent nav={'Goal'} />
      <SpaceComponent height={20} />
      <View
        style={[
          common.contain,
          {
            flex: 1,
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{alignItems: 'center', marginBottom: -80}}>
          <TextComponent
            text={step['title-start']}
            font={fontFamilies['bebasNeue']}
            size={30}
            color={colors['text-2']}
          />
          <SpaceComponent height={15} />
          <TextComponent
            text={text['sub-start']}
            color={colors['text']}
            size={14}
            styles={{textAlign: 'center', width: 294}}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={image}
            style={{width: 350, height: 350}}
            resizeMode="contain"
          />
          <TextComponent
            text={text['sub-start-2']}
            color={colors['text']}
            size={17}
            styles={{textAlign: 'center', width: 280}}
          />
        </View>
        <CustomButton
          title={button['get-started']}
          containerStyles={{marginBottom: 20}}
          handlePress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;
