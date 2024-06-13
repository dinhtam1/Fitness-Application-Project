import {
  Alert,
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import CustomButton from '../../components/button/buttonComponent';
import {Audio} from 'expo-av';
import RecommendTime from './component/recommendTime';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {useAlarmStore} from '../../store/useAuthStore';

const SleepScreen = () => {
  const [time, setTime] = useState(new Date());
  const [recommendTime, setRecommendTime] = useState([]);
  const [sound, setSound] = useState(null);
  const [isLooping, setIsLooping] = useState(true);
  const {alarms, setAlarms} = useAlarmStore();

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require('../../assets/sounds/clock_alarm.mp3'),
      {shouldPlay: false, isLooping: isLooping},
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const vietnamTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then(token => {
  //         console.log(token);
  //       });
  //   } else {
  //     console.log('error');
  //   }

  //   messaging()
  //     .getInitialNotification()
  //     .then(async remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open',
  //           remoteMessage.notification,
  //         );
  //         setInitialRoute(remoteMessage.data.type);
  //       }
  //     });

  //   messaging().onNotificationOpenedApp(async remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from',
  //       remoteMessage.notification,
  //     );
  //   });

  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  const handlePress = () => {
    let hour = time.getHours();
    let minute = time.getMinutes();
    let newMinute = 0;
    let timeRecommend = [];
    minute = hour * 60 + minute + 15;
    for (let i = 1; i <= 5; i++) {
      minute += 90;
      hour = Math.floor(minute / 60);
      newMinute = minute % 60;
      timeRecommend.push({hour, minute: newMinute});
    }
    setRecommendTime(timeRecommend);
  };

  const handleAlarm = (hour, minute, isOn) => {
    if (
      new Date().getHours() === hour &&
      new Date().getMinutes() === minute &&
      isOn
    ) {
      playSound();
    }
  };

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  return (
    <SafeAreaView>
      <BackComponent black back title={'SLEEP'} />
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors['border-4'],
            paddingVertical: 20,
            borderRadius: 20,
          }}>
          <TextComponent
            text={vietnamTime}
            size={65}
            color={colors['text']}
            font={fontFamilies['semibold']}
          />
        </View>
        <CustomButton
          handlePress={handlePress}
          title={'SLEEP'}
          textStyles={{fontFamily: fontFamilies['bold']}}
          containerStyles={{marginTop: 20}}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors['background-clock'],
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginBottom: 230,
          marginTop: 20,
        }}>
        {recommendTime.map((item, index) => (
          <RecommendTime
            index={index}
            hour={item.hour}
            minute={item.minute}
            onButtonPress={handleAlarm}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SleepScreen;
