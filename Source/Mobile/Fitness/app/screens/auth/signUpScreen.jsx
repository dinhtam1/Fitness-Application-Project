import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FormField from '../../components/form/formFieldComponent';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/button/buttonComponent';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import BackComponent from '../../components/icon/backComponent';
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
import {useAuthStore} from '../../store/useAuthStore';
import {apiRegister} from '../../apis/auth';
import axios from 'axios';

const SignUpScreen = () => {
  const {setForm} = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm();
  const navigation = useNavigation();
  // const onSubmit = useCallback(
  //   async data => {
  //     setForm(data);
  //     navigation.navigate('Old');
  //   },
  //   [setForm, navigation],
  // );
  // const onSubmit = async data => {
  //   const response = await apiRegister(data);
  //   console.log(response);
  //   if (response?.success) {
  //     console.log('Register success');
  //   }
  // };
  const onSubmit = async data => {
    const response = await apiRegister(data);
    // const response = await axios.post(
    //   'http://192.168.1.6:3055/auth/sign-up',
    //   data,
    // );
    console.log(response);
    if (response?.success) {
      console.log('Register success');
    }
  };
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent nav={'SignIn'} />
      <ScrollView>
        <View style={common.contain}>
          <View>
            <TextComponent
              text={title['sign-up']}
              color={colors['title']}
              size={30}
              font={fontFamilies['bebasNeue']}
              styles={{
                paddingBottom: 10,
              }}
            />
            <TextComponent
              text={text['sub-sign-up']}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
          <View style={{paddingVertical: 20}}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['name']}
                  title={titleForm['name']}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="full_name"
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['phone']}
                  title={titleForm['phone']}
                  handleChangeText={onChange}
                  keyboardType="number-pad"
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="phone_number"
            />
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
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
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
          <CustomButton
            title={button['sign-up']}
            handlePress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 20}}
          />
          <View style={{alignItems: 'center', marginVertical: 40}}>
            <Text style={{fontSize: 14, fontFamily: fontFamilies['light']}}>
              Already have an account?{' '}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignIn');
                }}>
                <TextComponent
                  text={'Login!'}
                  size={14}
                  font={fontFamilies['bold']}
                  styles={{transform: [{translateY: 3}]}}
                />
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
