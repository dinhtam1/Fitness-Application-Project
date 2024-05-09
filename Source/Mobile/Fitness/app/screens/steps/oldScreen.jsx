import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import PickerComponent from '../../components/picker/pickerComponent';
import CustomButton from '../../components/button/buttonComponent';
import SpaceComponent from '../../components/common/spaceComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {button, step} from '../../constants/text';
import {useNavigation, useRoute} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';
import {useAuthStore} from '../../store/useAuthStore';

const OldScreen = () => {
  const navigation = useNavigation();
  const [age, setAge] = useState(null);
  const {form, setForm} = useAuthStore();

  const onSubmit = () => {
    // setForm({...form, age});
    navigation.navigate('Weight');
  };
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent skip nav={'SignUp'} />
      <View
        style={[
          common.contain,
          {
            flex: 1,
            justifyContent: 'space-between',
          },
        ]}>
        <View>
          <TextComponent
            text={step['step-2']}
            color={colors['text-2']}
            size={15}
            font={fontFamilies['medium']}
          />
          <SpaceComponent height={10} />
          <TextComponent
            text={step['title-2']}
            color={colors['title']}
            size={30}
            font={fontFamilies['bebasNeue']}
          />
        </View>
        <View style={common.flex}>
          <PickerComponent onValueChange={value => setAge(value)} />
        </View>
        <CustomButton
          title={button['next-step']}
          containerStyles={{marginBottom: 20}}
          handlePress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default OldScreen;

const styles = StyleSheet.create({});
