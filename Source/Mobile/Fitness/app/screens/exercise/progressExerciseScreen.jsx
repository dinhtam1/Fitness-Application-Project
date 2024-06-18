import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import BackComponent from '../../components/header/backComponent';
import {common} from '../../styles/commonStyles';
import {apiExerciseDetail} from '../../apis';
import {button, navigator} from '../../constants/text';

const {width, height} = Dimensions.get('window');

const ProgressExerciseScreen = ({route}) => {
  const {exercises, single, namePlan} = route.params;
  const navigation = useNavigation();
  const [exercise, setExercise] = useState([]);
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const [countdown, setCountdown] = useState(0);
  const [isStop, setIsStop] = useState(true);
  const [exerciseId, setExerciseId] = useState(exercises[0].exerciseId);
  const [currentExercise, setCurrentExercise] = useState(1);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [duration, setDuration] = useState(0);
  const topRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiExerciseDetail(user.userId, token, exerciseId);
      console.log(response.data);
      if (response.statusCode === 200) {
        setExercise(response.data);
        setCountdown(response.data.duration * 60);
        setCaloriesBurned(caloriesBurned + response.data.caloriesBurned);
        setDuration(duration + response.data.duration);
      }
    };
    fetchData();
  }, [exerciseId]);

  useEffect(() => {
    let timer = null;
    if (!isStop && countdown > 0) {
      timer = setInterval(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown, isStop]);

  const handleStart = () => {
    setIsStop(!isStop);
  };

  const handleResult = () => {
    if (topRef.current) {
      topRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
    if (currentExercise < exercises.length) {
      setCurrentExercise(currentExercise + 1);
      setExerciseId(exercises[currentExercise].exerciseId);
      setCountdown(exercises[currentExercise].duration * 60);
      setIsStop(true);
      return;
    } else {
      navigation.navigate(navigator['result'], {
        caloriesBurned: caloriesBurned,
        duration: duration,
        namePlan: namePlan,
      });
    }
  };

  const handleResultSingle = () => {
    navigation.navigate(navigator['result'], {
      exercise: exercise,
    });
  };

  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent
        black
        back
        title={exercise.name}
        nav={navigator['full-exercise']}
        param={'category'}
        data={exercise.equipmentName}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={topRef}
        style={{marginBottom: -35}}>
        <ImageBackground
          src={exercise.image}
          style={{
            width: width,
            height: height / 2.8,
            backgroundColor: colors['border'],
          }}></ImageBackground>

        <View style={{paddingHorizontal: 26, marginTop: 20}}>
          <View>
            <TextComponent
              text={`Exercise ${currentExercise}/${exercises.length}`}
              size={13}
              font={fontFamilies['light']}
            />
            <TextComponent
              text={exercise.name}
              size={30}
              font={fontFamilies['bebasNeue']}
              styles={{
                width: width / 1.5,
                marginBottom: 5,
                marginTop: 10,
              }}
              space={-0.8}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {countdown / (exercise.duration * 60) > 0 && (
              <Progress.Circle
                size={150}
                indeterminate={false}
                progress={countdown / (exercise.duration * 60)}
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
            )}
            <TextComponent
              text={`${Math.floor((exercise.duration * 60) / 60)}:${(exercise.duration * 60) % 60 < 10 ? '0' : ''}${(exercise.duration * 60) % 60}`}
              size={25}
              styles={{marginTop: 10}}
              font={fontFamilies['semibold']}
            />
            {isStop ? (
              <TouchableOpacity
                onPress={handleStart}
                style={styles.button_stop}>
                <FontAwesome name="play" size={24} color="black" />
                <TextComponent
                  text={button['start']}
                  size={30}
                  font={fontFamilies['bebasNeue']}
                  styles={{marginLeft: 20}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleStart}
                style={styles.button_stop}>
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
          <View style={{marginVertical: 20}}>
            <Video
              style={styles.video}
              source={{uri: exercise.video_side}}
              isLooping
              useNativeControls
              resizeMode="cover"
              shouldPlay
            />
            <SpaceComponent height={20} />
            <Video
              style={styles.video}
              source={{uri: exercise.video_center}}
              isLooping
              useNativeControls
              resizeMode="cover"
              shouldPlay
            />
          </View>
          <CustomButton
            handlePress={single ? handleResultSingle : handleResult}
            title={button['done']}
            containerStyles={{marginBottom: 20}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: colors['border'],
  },

  button_stop: {
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
});
