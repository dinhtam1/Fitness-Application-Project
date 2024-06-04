import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from '../../../components/common/rowComponent';
import {Feather} from '@expo/vector-icons';
import {back, splash1} from '../../../assets';
import {MaterialIcons} from '@expo/vector-icons';
import TextComponent from '../../../components/text/textComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import FormField from '../../../components/form/formFieldComponent';
import {header} from '../../../assets';
import {useUserStore} from '../../../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Header = ({background, ...props}) => {
  const user = useUserStore(state => state.user);
  const navigation = useNavigation();
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState('');

  return (
    <SafeAreaView>
      <View style={{paddingHorizontal: 20}}>
        <RowComponent
          justify={'space-between'}
          styles={{
            width: '100%',
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={splash1} resizeMode="cover" style={styles.image} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <MaterialIcons name="notifications-none" size={26} color="black" />
          </TouchableOpacity>
        </RowComponent>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
