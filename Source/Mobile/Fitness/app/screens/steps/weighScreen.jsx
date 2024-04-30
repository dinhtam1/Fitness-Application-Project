import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/icon/backComponent';
import TextComponent from '../../components/text/textComponent';
import SpaceComponent from '../../components/common/spaceComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import CustomButton from '../../components/button/buttonComponent';
import FormField from '../../components/form/formFieldComponent';
import {button, step} from '../../constants/text';
import {useNavigation} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';
import {useAuthStore} from '../../store/useAuthStore';

const WeightScreen = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState(null);
  const {form, setForm} = useAuthStore();
  const onSubmit = () => {
    // setForm({...form, weight});
    navigation.navigate('GoalWeight');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={common.safeAreaView}>
        <BackComponent skip nav={'Old'} />
        <View style={common.contain}>
          <TextComponent
            text={step['step-3']}
            color={colors['text-2']}
            size={15}
            font={fontFamilies['medium']}
          />
          <SpaceComponent height={10} />
          <TextComponent
            text={step['title-3']}
            color={colors['title']}
            size={30}
            font={fontFamilies['bebasNeue']}
          />
          <SpaceComponent height={40} />
          <View style={common.flex}>
            <View
              style={{
                backgroundColor: colors['border'],
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 16,
              }}>
              <TextComponent
                text="KG"
                color={colors['title']}
                size={24}
                font={fontFamilies['medium']}
              />
            </View>
            <FormField
              keyboardType="numeric"
              inputStyles={{textAlign: 'center', fontSize: 20}}
              unit={'kg'}
              handleChangeText={value => setWeight(value)}
            />
          </View>
          <SpaceComponent height={100} />
          <CustomButton title={button['next-step']} handlePress={onSubmit} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default WeightScreen;
