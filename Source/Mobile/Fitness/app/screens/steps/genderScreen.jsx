import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {common} from '../../styles/commonStyles';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {button, step} from '../../constants/text';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../../components/common/spaceComponent';
import CustomButton from '../../components/button/buttonComponent';
import {useAuthStore} from '../../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';

const GenderScreen = () => {
  const buttonTitles = ['MALE', 'FEMALE'];
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const {form, setForm} = useAuthStore();
  const onSubmit = () => {
    setForm({...form, gender: selected.toLowerCase()});
    navigation.navigate('Weight');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={common.safeAreaView}>
        <BackComponent back black />
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
          </View>
          <View>
            {buttonTitles.map((item, index) => (
              <CustomButton
                key={index}
                title={item}
                handlePress={() => setSelected(item)}
                containerStyles={{
                  marginBottom: 20,
                  backgroundColor:
                    selected === item
                      ? colors['primary-color-black']
                      : 'transparent',
                  borderWidth: 1,
                  borderColor: colors['border'],
                }}
                textStyles={{
                  color:
                    selected === item
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

export default GenderScreen;
