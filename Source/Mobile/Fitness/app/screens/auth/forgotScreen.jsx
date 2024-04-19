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

export default function ForgotScreen() {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigation();
  const submit = async () => {};
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
              FORGOT PASSWORD
            </Text>
            <Text style={{fontSize: 15, paddingBottom: 3, color: '#3A4750'}}>
              Please enter your email below to reveive your password reset code.
            </Text>
          </View>
          <View style={{paddingVertical: 70}}>
            <FormField
              placeholder={'Enter email...'}
              title={'Email'}
              handleChangeText={e => setForm({email: e})}
            />
          </View>
          <CustomButton
            title="RESET PASSWORD"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 30}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
