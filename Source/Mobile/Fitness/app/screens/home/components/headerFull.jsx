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
import {MaterialIcons} from '@expo/vector-icons';
import TextComponent from '../../../components/text/textComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import FormField from '../../../components/form/formFieldComponent';
import {header} from '../../../assets';
import {useUserStore} from '../../../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

const HeaderFull = ({background, ...props}) => {
  const user = useUserStore(state => state.user);
  const navigation = useNavigation();
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      let timeOfDay;
      if (hours < 12) {
        timeOfDay = 'Morning';
      } else if (hours < 18) {
        timeOfDay = 'Afternoon';
      } else {
        timeOfDay = 'Evening';
      }

      setCurrentTimeOfDay(timeOfDay);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {background && (
        <ImageBackground
          source={header}
          style={{
            width: width,
            height: height / 3.3,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}></ImageBackground>
      )}
      <View
        style={
          background
            ? {paddingHorizontal: 20, paddingTop: 30, position: 'absolute'}
            : {
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: 'white',
                elevation: 5,
              }
        }>
        <RowComponent
          justify={'space-between'}
          styles={{
            width: '100%',
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather
                name="menu"
                size={26}
                color={background ? 'white' : 'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              {user?.avatar_url ? (
                <Image
                  src={user?.avatar_url}
                  resizeMode="cover"
                  style={styles.image}
                />
              ) : (
                <FontAwesome name="user-circle-o" size={40} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <MaterialIcons
              name="notifications-none"
              size={26}
              color={background ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </RowComponent>
        {background && (
          <>
            <TextComponent
              text={`Hello, Good ${currentTimeOfDay}`}
              size={10}
              color={colors['text-white']}
              styles={{marginTop: 15}}
            />
            <TextComponent
              text={user?.full_name}
              font={fontFamilies['medium']}
              size={20}
              color={colors['text-white']}
              styles={{marginTop: 8}}
            />
          </>
        )}
        {background && (
          <FormField
            placeholder={'Search'}
            icon={'search'}
            otherStyles={{marginTop: 0}}
          />
        )}
      </View>
    </>
  );
};

export default HeaderFull;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
