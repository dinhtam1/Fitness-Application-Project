import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../../components/common/spaceComponent';
import CustomButton from '../../components/button/buttonComponent';
import {button, step} from '../../constants/text';
import {useNavigation} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';
import {useAuthStore} from '../../store/useAuthStore';

const LevelScreen = () => {
  const buttonTitles = ['BEGINNER', 'ADVANCED'];
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState('');
  const {form, setForm} = useAuthStore();
  const onSubmit = () => {
    setForm({...form, level: selectedLevel});
    navigation.navigate('Goal');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={common.safeAreaView}>
        <BackComponent back black skip nav={'Height'} />
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
            {buttonTitles.map((title, index) => (
              <CustomButton
                key={index}
                title={title}
                handlePress={() => setSelectedLevel(title)}
                containerStyles={{
                  marginBottom: 20,
                  backgroundColor:
                    selectedLevel === title
                      ? colors['primary-color-black']
                      : 'transparent',
                  borderWidth: 1,
                  borderColor: colors['border'],
                }}
                textStyles={{
                  color:
                    selectedLevel === title
                      ? colors['text-white']
                      : colors['primary-color-black'],
                  fontSize: 18,
                }}
              />
            ))}
          </View>
          <CustomButton
            title={button['next-step']}
            containerStyles={{marginBottom: 20}}
            handlePress={onSubmit}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LevelScreen;

const styles = StyleSheet.create({});
