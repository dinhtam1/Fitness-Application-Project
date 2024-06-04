import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FormField from '../../components/form/formFieldComponent';
import CustomButton from '../../components/button/buttonComponent';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import BackComponent from '../../components/header/backComponent';
import {
  button,
  placeholder,
  text,
  title,
  titleForm,
} from '../../constants/text';
import {common} from '../../styles/commonStyles';
import {Controller, useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../constants/regex';
import {apiLogin, apiSendOTP} from '../../apis/auth';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';

export default function ForgotScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm();
  const onSubmit = async data => {
    const response = await apiSendOTP(data);
    if (response.statusCode === 200) {
      navigation.navigate('Verify', {email: data.email});
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
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent black back nav={'SignIn'} />
      <ScrollView>
        <View style={common.contain}>
          <View>
            <TextComponent
              text={title['forgot-password']}
              color={colors['title']}
              size={30}
              font={fontFamilies['bebasNeue']}
              styles={{
                paddingBottom: 10,
              }}
            />
            <TextComponent
              text={text['sub-forgot-password']}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
          <View style={{paddingVertical: 70}}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Not a valid email',
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
          </View>
          <CustomButton
            title={button['reset-password']}
            handlePress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 30}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
