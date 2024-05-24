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
import CustomButton from '../../components/button/buttonComponent';
import {button, step} from '../../constants/text';
import {useNavigation} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiUpdateProfile} from '../../apis/user';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalScreen = () => {
  const buttonTitles = ['Weight_loss', 'Gain_muscle'];
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState('');
  const {form, setForm, token} = useAuthStore();
  const {user} = useUserStore();
  console.log(form);
  const onSubmit = async () => {
    setForm({...form, goal: selectedLevel.toUpperCase()});
    const response = await apiUpdateProfile(
      {
        age: +form.age,
        weight: +form.weight,
        height: +form.height,
        gender: form.gender,
        goal_weight: +form.goal_weight,
        level: form.level,
        goal: form.goal,
      },
      user.userId,
      token,
    );
    if (response?.statusCode === 200) {
      navigation.navigate('Start');
      Toast.show(toastConfig({textMain: 'Successfully', visibilityTime: 2000}));
    } else {
      Toast.show(
        toastConfig({
          type: 'error',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
    }
  };

  const handleClickButton = goal => {
    setSelectedLevel(goal);
    setForm({...form, goal: goal.toUpperCase()});
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={common.safeAreaView}>
        <BackComponent skip nav={'Level'} />
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
              text={step['step-8']}
              color={colors['text-2']}
              size={15}
              font={fontFamilies['medium']}
            />
            <SpaceComponent height={10} />
            <TextComponent
              text={step['title-8']}
              color={colors['title']}
              size={30}
              font={fontFamilies['bebasNeue']}
            />
          </View>
          <View>
            {buttonTitles.map((item, index) => (
              <CustomButton
                key={index}
                title={item.replace('_', ' ')}
                handlePress={() => handleClickButton(item)}
                containerStyles={{
                  marginBottom: 20,
                  backgroundColor:
                    selectedLevel === item
                      ? colors['primary-color-black']
                      : 'transparent',
                  borderWidth: 1,
                  borderColor: colors['border'],
                }}
                textStyles={{
                  color:
                    selectedLevel === item
                      ? colors['text-white']
                      : colors['primary-color-black'],
                  fontSize: 18,
                }}
              />
            ))}
          </View>
          <CustomButton
            title={button['finish-step']}
            containerStyles={{marginBottom: 20}}
            handlePress={onSubmit}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default GoalScreen;
