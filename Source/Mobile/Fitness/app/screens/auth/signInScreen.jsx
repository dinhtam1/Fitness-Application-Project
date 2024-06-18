import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FormField from '../../components/form/formFieldComponent';
import CustomButton from '../../components/button/buttonComponent';

import {Link, useNavigation} from '@react-navigation/native';
import {apiLogin} from '../../apis/auth';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import {
  button,
  message,
  placeholder,
  text,
  title,
  titleForm,
} from '../../constants/text';
import {common} from '../../styles/commonStyles';
import {Controller, useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../constants/regex';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {navigator} from '../../constants/text';

export default function SignInScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {setUser} = useUserStore();
  const {setToken, setIsLogin} = useAuthStore();
  const onSubmit = async data => {
    const response = await apiLogin(data);
    if (response.statusCode === 200) {
      setToken(response.data.tokens.accessToken);
      setIsLogin(true);
      setUser(response.data.user);
      Toast.show(
        toastConfig({
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={common.safeAreaView}>
        <View style={common.contain}>
          <View style={styles.container_title}>
            <TextComponent
              text={title['sign-in']}
              color={colors['title']}
              size={30}
              font={fontFamilies['bebasNeue']}
              styles={styles.container_text}
            />
            <TextComponent
              text={text['sub-sign-in']}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
          <View style={{paddingVertical: 20}}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: message['required']},
                pattern: {
                  value: EMAIL_REGEX,
                  message: message['invalid-email'],
                },
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['email']}
                  title={titleForm['email']}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: message['required']},
                minLength: {
                  value: 8,
                  message: message['invalid-password'],
                },
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['password']}
                  title={titleForm['password']}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="password"
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigator['forgot-password']);
              }}>
              <TextComponent
                text={text['forgot-password']}
                font={fontFamilies['bold']}
                size={14}
              />
            </TouchableOpacity>
          </View>
          <CustomButton
            title={button['sign-in']}
            handlePress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 20}}
          />
          <View style={{alignItems: 'center', marginVertical: 40}}>
            <Text style={{fontSize: 14, fontFamily: fontFamilies['light']}}>
              Don't have an account?{' '}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(navigator['sign-up']);
                }}>
                <TextComponent
                  text={'Register!'}
                  size={14}
                  font={fontFamilies['bold']}
                  styles={{transform: [{translateY: 3}]}}
                />
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container_title: {paddingTop: 30},
  container_text: {
    paddingBottom: 10,
  },
});
