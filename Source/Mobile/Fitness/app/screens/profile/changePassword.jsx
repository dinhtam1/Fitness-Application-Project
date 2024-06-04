import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import {common} from '../../styles/commonStyles';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {placeholder, text, title, titleForm} from '../../constants/text';
import {fontFamilies} from '../../constants/fontFamilies';
import {Controller, useForm} from 'react-hook-form';
import FormField from '../../components/form/formFieldComponent';
import SpaceComponent from '../../components/common/spaceComponent';
import CustomButton from '../../components/button/buttonComponent';
import {apiChangePassword} from '../../apis';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {useNavigation} from '@react-navigation/native';

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm();
  const navigation = useNavigation();
  const onSubmit = async data => {
    const response = await apiChangePassword(data);
    if (response.status === 200) {
      Toast.show(
        toastConfig({
          type: 'success',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
      navigation.navigate('Home');
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
      <SafeAreaView>
        <BackComponent black back nav={'ForgotPassword'} />
        <View style={common.contain}>
          <View>
            <TextComponent
              text={'CHANGE PASSWORD'}
              color={colors['title']}
              size={30}
              font={fontFamilies['bebasNeue']}
              styles={{
                paddingBottom: 10,
              }}
            />
            <TextComponent
              text={
                'Please enter your new password below to reset your password.'
              }
              size={15}
            />
          </View>
          <SpaceComponent height={60} />
          <View>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
                // minLength: {
                //   value: 8,
                //   message: 'Password must be at least 8 characters',
                // },
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['new_password']}
                  title={titleForm['newPassword']}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="new_password"
            />
            <SpaceComponent height={20} />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field cannot empty',
                },
                // minLength: {
                //   value: 8,
                //   message: 'Password must be at least 8 characters',
                // },
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['confirm_password']}
                  title={titleForm['confirmPassword']}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="confirm_password"
            />
          </View>
          <SpaceComponent height={60} />
          <CustomButton
            title={'RESET PASSWORD'}
            handlePress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
