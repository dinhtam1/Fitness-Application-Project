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
import BackComponent from '../../components/icon/backComponent';
import {
  button,
  placeholder,
  text,
  title,
  titleForm,
} from '../../constants/text';
import {common} from '../../styles/commonStyles';

export default function ForgotScreen() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
  });
  const navigation = useNavigation();
  const submit = async () => {};
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent />
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
            <FormField
              placeholder={placeholder['email']}
              title={titleForm['email']}
              handleChangeText={e => setForm({email: e})}
            />
          </View>
          <CustomButton
            title={button['reset-password']}
            handlePress={() =>
              navigation.navigate('Verify', {email: form.email})
            }
            isLoading={isSubmitting}
            containerStyles={{marginTop: 30}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
