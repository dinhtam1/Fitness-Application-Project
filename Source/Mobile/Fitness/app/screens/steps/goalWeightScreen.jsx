import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../../components/common/spaceComponent';
import FormField from '../../components/form/formFieldComponent';
import CustomButton from '../../components/button/buttonComponent';
import {button, step} from '../../constants/text';
import {useNavigation} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';
import {useAuthStore} from '../../store/useAuthStore';

const GoalWeightScreen = () => {
  const navigation = useNavigation();
  const [goalWeight, setGoalWeight] = useState(null);
  const {form, setForm} = useAuthStore();
  const onSubmit = () => {
    setForm({...form, goal_weight: goalWeight});
    navigation.navigate('Height');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={common.safeAreaView}>
        <BackComponent back black />
        <View style={common.contain}>
          <TextComponent
            text={step['step-5']}
            color={colors['text-2']}
            size={15}
            font={fontFamilies['medium']}
          />
          <SpaceComponent height={10} />
          <TextComponent
            text={step['title-5']}
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
              handleChangeText={value => setGoalWeight(value)}
            />
          </View>
          <SpaceComponent height={100} />
          <CustomButton title={button['next-step']} handlePress={onSubmit} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default GoalWeightScreen;
