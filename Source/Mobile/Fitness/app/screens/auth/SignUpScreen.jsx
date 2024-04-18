import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import FormField from '../../components/form/FormField';
import {Link} from '@react-navigation/native';
import CustomButton from '../../components/button/Button';
import {facebook, google} from '../../assets';

const SignUpScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = () => {};
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
              CREATE ACCOUNTS
            </Text>
            <Text style={{fontSize: 15, paddingBottom: 3, color: '#3A4750'}}>
              Please enter your credentials to
            </Text>
            <Text style={{fontSize: 15, color: '#3A4750'}}>proceed</Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <FormField
              placeholder={'Enter name...'}
              title={'Full Name'}
              handleChangeText={e => setForm({...form, email: e})}
            />
            <FormField
              placeholder={'Enter phone...'}
              title={'Phone'}
              handleChangeText={e => setForm({...form, password: e})}
            />
            <FormField
              placeholder={'Enter address...'}
              title={'Email address'}
              handleChangeText={e => setForm({...form, password: e})}
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
            title="CREATE ACCOUNT"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 20}}
          />
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <Text style={{fontWeight: '400', fontSize: 12, color: '#303841'}}>
              Or Register with
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
              Already have an account?{' '}
              <Link style={{fontWeight: '600'}} to="/signup">
                Login!
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
