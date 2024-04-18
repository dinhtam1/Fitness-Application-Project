import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {back, facebook, google} from '../../assets';
import FormField from '../../components/form/FormField';
import CustomButton from '../../components/button/Button';
import {AntDesign} from '@expo/vector-icons';
import {Link} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiLogin} from '../../apis/auth';

export default function SignInScreen() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
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
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View
        style={{
          left: 20,
          top: 20,
          width: '100%',
          height: 20,
          backgroundColor: '#fff',
          zIndex: 10,
        }}>
        <AntDesign name="left" size={22} color="black" />
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={{paddingTop: 30}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                paddingBottom: 15,
                color: '#000',
                fontWeight: '500',
              }}>
              WELCOME TO PRO FITNESS!
            </Text>
            <Text style={{fontSize: 15, paddingBottom: 3, color: '#3A4750'}}>
              Hello there, sign in to
            </Text>
            <Text style={{fontSize: 15, color: '#3A4750'}}>continue!</Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <FormField
              placeholder={'Enter email...'}
              title={'Email address'}
              handleChangeText={e => setForm({...form, email: e})}
            />
            <FormField
              placeholder={'Enter password...'}
              title={'Password'}
              handleChangeText={e => setForm({...form, password: e})}
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Link to={'/forgot'} style={{fontWeight: '500'}}>
              Forgot Password?
            </Link>
          </View>
          <CustomButton
            title="LOGIN"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 20}}
          />
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <Text style={{fontWeight: '400', fontSize: 12, color: '#303841'}}>
              Or Login with
            </Text>
          </View>
          <CustomButton
            title="Connect with Google"
            icon={google}
            textStyles={{fontSize: 14, color: '#303841', fontWeight: '500'}}
            containerStyles={{
              borderColor: 'rgba(105, 105, 105, 0.25)',
              backgroundColor: '#F5F5F5',
            }}
          />
          <CustomButton
            title="Connect with Facebook"
            icon={facebook}
            textStyles={{fontSize: 14, color: '#FFFFFF', fontWeight: '500'}}
            containerStyles={{
              backgroundColor: '#4267B2',
              marginTop: 10,
            }}
          />
          <View style={{alignItems: 'center', marginVertical: 40}}>
            <Text style={{fontSize: 14, fontWeight: '400'}}>
              Don't have an account?{' '}
              <Link style={{fontWeight: '600'}} to="/signup">
                Register!
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
