import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import TextComponent from '../../components/text/textComponent';
import {button, text, title} from '../../constants/text';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import BackComponent from '../../components/header/backComponent';
import CustomButton from '../../components/button/buttonComponent';
import {common} from '../../styles/commonStyles';
import SpaceComponent from '../../components/common/spaceComponent';

const VerifyScreen = ({route}) => {
  const {email} = route.params;
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState(Array(4).fill(''));
  const inputRefs = useRef([]);
  const submit = async () => {};
  const onChangeValue = (text, index) => {
    const newValue = values.map((item, valueIndex) => {
      if (valueIndex === index) {
        return text;
      }
      return item;
    });

    setValues(newValue);
    handleChange(text, index);
  };
  const handleChange = (text, index) => {
    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus();
    }

    return inputRefs?.current[index - 1]?.focus();
  };
  const handleBackspace = (event, index) => {
    const {key} = event.nativeEvent;
    if (key === 'Backspace' && index !== 0) {
      handleChange('', index);
    }
  };
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent />
      <ScrollView>
        <View style={common.contain}>
          <View>
            <TextComponent
              text={title.verify}
              color={colors['title']}
              size={30}
              font={fontFamilies['bebasNeue']}
              styles={{
                paddingBottom: 10,
              }}
            />
            <TextComponent
              text={`${text['sub-verify']} ${email}`}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
          <SpaceComponent height={60} />
          <View style={styles.container}>
            {[...new Array(4)].map((_, i) => (
              <View style={styles.input}>
                <TextInput
                  ref={ref => {
                    if (ref && !inputRefs.current.includes(ref)) {
                      inputRefs.current = [...inputRefs.current, ref];
                    }
                  }}
                  key={i}
                  maxLength={1}
                  keyboardType="number-pad"
                  contextMenuHidden
                  onChangeText={text => onChangeValue(text, i)}
                  onKeyPress={e => handleBackspace(e, i)}
                  style={styles.text}
                />
              </View>
            ))}
          </View>
          <CustomButton
            title={button.resend}
            containerStyles={{backgroundColor: 'transparent', borderWidth: 0}}
            textStyles={{
              color: colors['primary-color-black'],
              fontSize: 20,
              fontFamily: fontFamilies['medium'],
              textDecorationLine: 'underline',
            }}
          />
          <CustomButton
            title={button['reset-password']}
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 30}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    alignSelf: 'center',
    marginTop: 60,
  },
  input: {
    width: 60,
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(105, 105, 105, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    color: colors['title'],
    fontSize: 20,
    fontFamily: fontFamilies['bold'],
    textAlign: 'center',
  },
});
