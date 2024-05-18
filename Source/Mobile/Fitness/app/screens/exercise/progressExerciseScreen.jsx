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
import {exercise1, exercise2} from '../../assets';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../../components/text/textComponent';
import CustomButton from '../../components/button/buttonComponent';
import * as Progress from 'react-native-progress';
import {Entypo} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

const ProgressExerciseScreen = () => {
  const initialCountdownTime = 5 * 60;
  const [countdown, setCountdown] = useState(initialCountdownTime);
  useEffect(() => {
    const timer =
      countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);
  return (
    <ScrollView>
      <ImageBackground
        source={exercise2}
        style={{
          width: width,
          height: height / 2.8,
        }}></ImageBackground>

      <View style={{paddingHorizontal: 26, marginTop: 10}}>
        <View style={{marginTop: 20}}>
          <TextComponent text={'Exercise 3/12'} />
          <TextComponent
            text={'EXERCISES WITH SITTING DUMBELLS'}
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
            unfilledColor="#F2F2F2"
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
          <TouchableOpacity
            style={{
              borderWidth: 1,
              paddingVertical: 20,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              paddingHorizontal: 30,
            }}>
            <Entypo name="controller-stop" size={30} color="black" />
            <TextComponent
              text={'STOP'}
              size={30}
              font={fontFamilies['bebasNeue']}
              styles={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 40}}>
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
        </View>
        <CustomButton title={'DONE'} containerStyles={{marginBottom: 40}} />
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
});
