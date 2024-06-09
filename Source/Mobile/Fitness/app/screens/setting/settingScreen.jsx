import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import {MaterialIcons} from '@expo/vector-icons';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import BorderComponent from '../../components/common/borderComponent';
import {colors} from '../../constants/colors';
import {Feather} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const [isOn, setIsOn] = useState(false);
  const navigation = useNavigation();

  const onColor = colors['primary-color'];
  const offColor = colors['toggle'];
  return (
    <SafeAreaView
      style={{backgroundColor: colors['background-white'], height: '100%'}}>
      <BackComponent black back title={'APP SETTING'} nav={'Main'} />
      <View style={{paddingHorizontal: 20, marginTop: 40}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <View style={{width: 30, alignItems: 'center'}}>
            <MaterialIcons
              name="notifications-none"
              size={33}
              color={'black'}
            />
          </View>
          <TextComponent
            text={'Reminder'}
            size={18}
            font={fontFamilies['medium']}
            color={colors['title']}
          />
        </TouchableOpacity>
        <BorderComponent color={colors['border']} margin={15} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <View style={{width: 30, alignItems: 'center'}}>
            <Feather name="lock" size={26} color="black" />
          </View>
          <TextComponent
            text={'Change Password'}
            size={18}
            font={fontFamilies['medium']}
            color={colors['title']}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
