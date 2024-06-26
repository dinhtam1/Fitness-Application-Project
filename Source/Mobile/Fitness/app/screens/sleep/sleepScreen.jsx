import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import {useAlarmStore} from '../../store/useAuthStore';
import {title} from '../../constants/text';
import DateTimePickerModal from '@react-native-community/datetimepicker';

const SleepScreen = () => {
  const [time, setTime] = useState(new Date());
  const [recommendTime, setRecommendTime] = useState([]);
  const [sound, setSound] = useState(null);
  const [isLooping, setIsLooping] = useState(true);
  const {alarms, setAlarms} = useAlarmStore();
  const [timeSleep, setTimeSleep] = useState('00:00:00');
  const [swap, setSwap] = useState(true);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('time');

  const onChange = (event, timeSleep) => {
    let vietnamTime = timeSleep.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    vietnamTime = `${vietnamTime}:00`;
    setTimeSleep(vietnamTime);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require('../../assets/sounds/clock_alarm.mp3'),
      {shouldPlay: false, isLooping: isLooping},
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    if (swap) {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [swap]);
  const vietnamTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

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

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = time => {
  //   let newTime = time.toLocaleTimeString('en-US', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     timeZone: 'Asia/Ho_Chi_Minh',
  //   });
  //   newTime = `${newTime}:00`;
  //   setTimeSleep(newTime);
  //   hideDatePicker();
  // };

  const handleEstimate = () => {
    setShow(false);
    let hour = parseInt(timeSleep.slice(0, 2), 10);
    let minute = parseInt(timeSleep.slice(3, 5), 10);
    let totalMinutes = hour * 60 + minute - 15;
    let timeRecommend = [];

    for (let i = 1; i <= 5; i++) {
      totalMinutes -= 90;
      let newHour = Math.floor(totalMinutes / 60);
      let newMinute = totalMinutes % 60;

      if (newHour < 0) {
        newHour += 24;
      }

      if (newMinute < 0) {
        newHour = newHour - 1 < 0 ? 23 : newHour - 1;
        newMinute += 60;
      }

      let formattedHour = newHour.toString();
      let formattedMinute = newMinute.toString();

      timeRecommend.push({hour: formattedHour, minute: formattedMinute});
    }
    setRecommendTime(timeRecommend);
  };

  const handleSwap = () => {
    setSwap(!swap);
  };

  const renderAlarm = () => {
    return (
      <>
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <View style={styles.clock}>
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {recommendTime.map((item, index) => (
            <RecommendTime
              index={index}
              hour={item.hour}
              minute={item.minute}
              onButtonPress={handleAlarm}
              toggle
            />
          ))}
        </ScrollView>
      </>
    );
  };

  const render = () => {
    return (
      <>
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <TouchableOpacity
            onPress={() => showMode('time')}
            style={styles.clock}>
            <TextComponent
              text={timeSleep}
              size={65}
              color={colors['text']}
              font={fontFamilies['semibold']}
            />
          </TouchableOpacity>
          {show && (
            <DateTimePickerModal
              value={time}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}
          <CustomButton
            handlePress={handleEstimate}
            title={'Estimate'}
            textStyles={{fontFamily: fontFamilies['bold']}}
            containerStyles={{marginTop: 20}}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {recommendTime.map((item, index) => (
            <RecommendTime
              index={index}
              hour={item.hour}
              minute={item.minute}
              onButtonPress={handleAlarm}
            />
          ))}
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView>
      <BackComponent
        black
        back
        title={swap ? title['sleep'] : title['estimate']}
        swap
        handleSwap={handleSwap}
      />
      {swap ? renderAlarm() : render()}
    </SafeAreaView>
  );
};

export default SleepScreen;

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors['background-clock'],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 230,
    marginTop: 20,
  },
  clock: {
    alignItems: 'center',
    backgroundColor: colors['border-4'],
    paddingVertical: 20,
    borderRadius: 20,
  },
  customDatePicker: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    color: '#000',
  },
});
