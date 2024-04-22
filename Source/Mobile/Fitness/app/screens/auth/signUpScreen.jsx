import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
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
              text={title['sign-up']}
              color={colors['title']}
              size={24}
              font={fontFamilies['bold']}
              styles={{
                paddingBottom: 20,
              }}
            />
            <TextComponent
              text={text['sub-sign-up']}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
          <View style={{paddingVertical: 20}}>
            <FormField
              placeholder={placeholder['name']}
              title={titleForm['name']}
              handleChangeText={e => setForm({...form, email: e})}
            />
            <FormField
              placeholder={placeholder['email']}
              title={titleForm['email']}
              handleChangeText={e => setForm({...form, phone: e})}
            />
            <FormField
              placeholder={placeholder['address']}
              title={titleForm['address']}
              handleChangeText={e => setForm({...form, address: e})}
            />
            <FormField
              placeholder={placeholder['password']}
              title={titleForm['password']}
              handleChangeText={e => setForm({...form, password: e})}
            />
          </View>
          <CustomButton
            title={button['sign-up']}
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
