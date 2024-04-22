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
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/button/buttonComponent';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import BackComponent from '../../components/icon/backComponent';

const SignUpScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigation();
  const submit = () => {};
  return (
    <SafeAreaView style={{height: '100%', paddingTop: 20}}>
      <BackComponent />
      <ScrollView>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={{paddingTop: 30}}>
            <TextComponent
              text="CREATE ACCOUNTS"
              color={colors['title']}
              size={24}
              font={fontFamilies['bold']}
              styles={{
                paddingBottom: 20,
              }}
            />
            <TextComponent
              text={'Please enter your credentials to proceed'}
              size={15}
              font={fontFamilies['medium']}
            />
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
              handleChangeText={e => setForm({...form, phone: e})}
            />
            <FormField
              placeholder={'Enter address...'}
              title={'Email address'}
              handleChangeText={e => setForm({...form, address: e})}
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
