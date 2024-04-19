import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import FormField from '../../components/form/formFieldComponent';
import {Link, useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/button/buttonComponent';
import {facebook, google} from '../../assets';

const SignUpScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigation();
  const submit = () => {};
  return (
    <SafeAreaView style={{height: '100%', paddingTop: 20}}>
      <View
        style={{
          left: 20,
          top: 20,
          width: '100%',
          height: 22,
          zIndex: 10,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <AntDesign name="left" size={22} color="black" />
        </TouchableOpacity>
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
              Please enter your credentials to proceed
            </Text>
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
          <CustomButton
            title="CREATE ACCOUNT"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 20}}
          />
          <View style={{alignItems: 'center', marginVertical: 40}}>
            <Text style={{fontSize: 14, fontWeight: '400'}}>
              Already have an account?{' '}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignIn');
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    transform: [{translateY: 3}],
                  }}>
                  Login!
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
