import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextComponent from '../../components/text/textComponent';
import {button, text, title} from '../../constants/text';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import BackComponent from '../../components/icon/backComponent';
import CustomButton from '../../components/button/buttonComponent';
import FormField from '../../components/form/formFieldComponent';

const VerifyScreen = ({route}) => {
  const {email} = route.params;
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = async () => {};
  return (
    <SafeAreaView style={{height: '100%', paddingTop: 20}}>
      <BackComponent />
      <ScrollView>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={{paddingTop: 30}}>
            <TextComponent
              text={title['forgot-password']}
              color={colors['title']}
              size={24}
              font={fontFamilies['bold']}
              styles={{
                paddingBottom: 20,
              }}
            />
            <TextComponent
              text={`${text['sub-verify']} ${email}`}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center', gap: 20}}>
            <FormField />
            <FormField />
            <FormField />
            <FormField />
          </View>
          <CustomButton
            title={button['reset-password']}
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={{marginTop: 30}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyScreen;
