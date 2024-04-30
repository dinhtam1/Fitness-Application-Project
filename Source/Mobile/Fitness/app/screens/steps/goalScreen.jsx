import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackComponent from '../../components/icon/backComponent';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../../components/common/spaceComponent';
import CustomButton from '../../components/button/buttonComponent';
import {button, step} from '../../constants/text';
import {useNavigation} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';
import {useAuthStore} from '../../store/useAuthStore';

const GoalSceen = () => {
  const buttonTitles = ['Weight loss', 'Gain muscle', 'Improve fitness'];
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState('');
  const {form, setForm} = useAuthStore();
  const onSubmit = () => {
    setForm({...form, goal: selectedLevel.toUpperCase()});
    navigation.navigate('Start');
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
              text={step['step-7']}
              color={colors['text-2']}
              size={15}
              font={fontFamilies['medium']}
            />
            <SpaceComponent height={10} />
            <TextComponent
              text={step['title-7']}
              color={colors['title']}
              size={30}
              font={fontFamilies['bebasNeue']}
            />
          </View>
          <View>
            {buttonTitles.map((item, index) => (
              <CustomButton
                key={index}
                title={item}
                handlePress={() => setSelectedLevel(item)}
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

export default GoalSceen;
