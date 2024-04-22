import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FormField from '../../components/form/formFieldComponent';
import CustomButton from '../../components/button/buttonComponent';

import {Link, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiLogin} from '../../apis/auth';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import {
  button,
  placeholder,
  text,
  title,
  titleForm,
} from '../../constants/text';

export default function SignInScreen() {
  // HANDLE DATA
  const [isSubmitting, setSubmitting] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  /**
   * Navigation
   */
  const navigation = useNavigation();
  useEffect(() => {
    const storeData = async () => {
      try {
        const response = await AsyncStorage.setItem('dataUser');
        if (response) {
          const jsonValue = JSON.parse(response);
          if (jsonValue.isRemember) {
            setForm('email', jsonValue.email);
            setForm('password', jsonValue.password);
            setIsRemember(jsonValue.isRemember);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    storeData();
  }, [setForm]);

  /**
   * Submit funtion
   */
  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    const response = await apiLogin(form);
    if (response?.success) {
      AsyncStorage.setItem(
        'dataUser',
        JSON.stringify({
          email: form.email,
          password: form.password,
          isRemember,
        }),
      );
    } else {
      AsyncStorage.setItem('dataUser', JSON.stringify({isRemember}));
    }
  };
  // VIEW
  return (
    <SafeAreaView style={{height: '100%', paddingTop: 20}}>
      <ScrollView>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={{paddingTop: 30}}>
            <TextComponent
              text={title['sign-in']}
              color={colors['title']}
              size={24}
              font={fontFamilies['bold']}
              styles={{
                paddingBottom: 20,
              }}
            />
            <TextComponent
              text={text['sub-sign-in']}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
          <View style={{paddingVertical: 20}}>
            <FormField
              placeholder={placeholder['email']}
              title={titleForm['email']}
              handleChangeText={e => setForm({...form, email: e})}
            />
            <FormField
              placeholder={placeholder['password']}
              title={titleForm['password']}
              handleChangeText={e => setForm({...form, password: e})}
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPassword');
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
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 20}}
          />
          <View style={{alignItems: 'center', marginVertical: 40}}>
            <Text style={{fontSize: 14, fontFamily: fontFamilies['light']}}>
              Don't have an account?{' '}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
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
      </ScrollView>
    </SafeAreaView>
  );
}
