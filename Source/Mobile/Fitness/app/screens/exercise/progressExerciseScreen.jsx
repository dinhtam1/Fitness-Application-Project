import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {exercise1, exercise2, notification} from '../../assets';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../../components/text/textComponent';
import CustomButton from '../../components/button/buttonComponent';
import * as Progress from 'react-native-progress';
import {Entypo} from '@expo/vector-icons';
import {Video, Audio} from 'expo-av';
import SpaceComponent from '../../components/common/spaceComponent';
import {colors} from '../../constants/colors';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {apiUpdateDashboard} from '../../apis/dashboard';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';

const {width, height} = Dimensions.get('window');

const ProgressExerciseScreen = ({route}) => {
  const {exercise} = route.params;
  const navigation = useNavigation();
  const initialCountdownTime = exercise.duration * 60;
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const [countdown, setCountdown] = useState(initialCountdownTime);
  const [isStop, setIsStop] = useState(true);
  const sound = new Audio.Sound();

  // useEffect(() => {
  //   const loadSound = async () => {
  //     await sound.loadAsync(notification);
  //   };
  //   loadSound();
  // }, []);

  useEffect(() => {
    let timer = null;
    if (!isStop && countdown > 0) {
      timer = setInterval(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      sound.playAsync();
    }
    return () => clearInterval(timer);
  }, [countdown, isStop]);

  const handleStart = () => {
    setIsStop(!isStop);
  };

  const handleResult = () => {
    navigation.navigate('Result', {exercise: exercise});
  };
  return (
    <ScrollView>
      <ImageBackground
        src={exercise.image}
        style={{
          width: width,
          height: height / 2.8,
        }}></ImageBackground>

      <View style={{paddingHorizontal: 26, marginTop: 10}}>
        <View style={{marginTop: 20}}>
          <TextComponent text={'Exercise 3/12'} />
          <TextComponent
            text={exercise.name}
            size={30}
            font={fontFamilies['bebasNeue']}
            styles={{
              width: width / 1.5,
              marginBottom: 5,
              marginTop: 20,
            }}
            space={-0.8}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Progress.Circle
            size={150}
            indeterminate={false}
            progress={countdown / initialCountdownTime}
            direction={'counter-clockwise'}
            fill="transparent"
            showsText={true}
            borderColor="#F2F2F2"
            color="black"
            thickness={10}
            unfilledColor={colors['border-3']}
            formatText={() =>
              `${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`
            }
            strokeCap="round"
          />
          <TextComponent
            text={`${Math.floor(initialCountdownTime / 60)}:${initialCountdownTime % 60 < 10 ? '0' : ''}${initialCountdownTime % 60}`}
            size={25}
            styles={{marginTop: 10}}
            font={fontFamilies['semibold']}
          />
          {isStop ? (
            <TouchableOpacity
              onPress={handleStart}
              style={{
                borderWidth: 1,
                paddingVertical: 20,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 30,
                justifyContent: 'space-between',
              }}>
              <FontAwesome name="play" size={24} color="black" />
              <TextComponent
                text={'START'}
                size={30}
                font={fontFamilies['bebasNeue']}
                styles={{marginLeft: 20}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStart}
              style={{
                borderWidth: 1,
                paddingVertical: 20,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 30,
                justifyContent: 'space-between',
              }}>
              <Entypo name="controller-stop" size={30} color="black" />
              <TextComponent
                text={'STOP'}
                size={30}
                font={fontFamilies['bebasNeue']}
                styles={{marginLeft: 20}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginVertical: 40}}>
          <Video
            style={styles.video}
            source={{uri: exercise.video_side}}
            isLooping
            useNativeControls
            resizeMode="cover"
          />
          <SpaceComponent height={20} />
          <Video
            style={styles.video}
            source={{uri: exercise.video_center}}
            isLooping
            useNativeControls
            resizeMode="cover"
          />
        </View>
        <CustomButton
          handlePress={handleResult}
          title={'DONE'}
          containerStyles={{marginBottom: 40}}
        />
      </View>
    </ScrollView>
  );
};

export default ProgressExerciseScreen;

const styles = StyleSheet.create({
  image: {
    width: width - 2 * 26,
    borderRadius: 10,
    height: 200,
    marginBottom: 30,
  },
  video: {
    width: '100%',
    height: 200,
  },
});
