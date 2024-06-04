import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TextComponent from '../../components/text/textComponent';
import {button, text, title} from '../../constants/text';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import BackComponent from '../../components/header/backComponent';
import CustomButton from '../../components/button/buttonComponent';
import {common} from '../../styles/commonStyles';
import SpaceComponent from '../../components/common/spaceComponent';
import {apiSendOTP, apiVerifyOTP} from '../../apis/auth';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const VerifyScreen = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState(Array(4).fill(''));
  const inputRefs = useRef([]);
  const [countdown, setCountdown] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);

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
  const onSubmit = async () => {
    const response = await apiVerifyOTP({OTP: values.join(''), email: email});
    if (response.statusCode === 200) {
      await AsyncStorage.setItem('token', response.data.tokens.accessToken);
      navigation.navigate('ChangePassword');
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
  const onResend = async event => {
    event.persist();
    setCountdown(60);
    setIsBlurred(true);
    const response = await apiSendOTP({email: route.params.email});
    if (response.statusCode === 200) {
      Toast.show(
        toastConfig({
          type: 'success',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
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

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsBlurred(false);
    }
  }, [countdown]);
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent back black nav={'ForgotPassword'} />
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
          <View
            style={{
              alignItems: 'center',
              minHeight: 62,
            }}>
            {countdown ? (
              <TextComponent
                text={`Resend in ${countdown}s`}
                size={19}
                font={fontFamilies['medium']}
                styles={{
                  opacity: isBlurred ? 0.5 : 1,
                  marginTop: 16,
                }}
              />
            ) : (
              <CustomButton
                title={button.resend}
                containerStyles={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                textStyles={{
                  color: colors['primary-color-black'],
                  fontSize: 20,
                  fontFamily: fontFamilies['medium'],
                  textDecorationLine: 'underline',
                }}
                handlePress={onResend}
              />
            )}
          </View>
          <CustomButton
            title={button['reset-password']}
            handlePress={onSubmit}
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
