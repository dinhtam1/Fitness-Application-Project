import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SimpleLineIcons} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import CustomButton from '../../components/button/buttonComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiExerciseDetail} from '../../apis';
import {Video} from 'expo-av';
import SpaceComponent from '../../components/common/spaceComponent';
import {useNavigation} from '@react-navigation/native';
import BackComponent from '../../components/header/backComponent';
const {width, height} = Dimensions.get('window');

const DetailExerciseScreen = ({route}) => {
  const navigation = useNavigation();
  const {exerciseId} = route.params;
  const {token} = useAuthStore();
  const [exercise, setExercise] = useState({});
  const {user} = useUserStore();
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiExerciseDetail(user.userId, token, exerciseId);
      if (response.statusCode === 200) {
        setExercise(response.data);
      }
    };
    fetchData();
  }, []);

  const handleStart = () => {
    navigation.navigate('ProgressExercise', {exercise: exercise});
  };

  return (
    <SafeAreaView>
      <BackComponent
        black
        back
        title={exercise.name}
        nav={'FullExercise'}
        param={'category'}
        data={exercise.equipmentName}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <ImageBackground
          src={exercise.image}
          style={{
            width: width,
            height: height / 2.8,
          }}></ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors['background-white'],
            width: width / 1.15,
            paddingVertical: 40,
            position: 'absolute',
            top: height / 3.5,
            left: width / 15,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 30,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SimpleLineIcons
              name="fire"
              size={22}
              color={'black'}
              style={{marginRight: 5}}
            />
            <TextComponent
              text={exercise.caloriesBurned}
              unit={'kcal'}
              size={20}
              font={fontFamilies['medium']}
            />
          </View>
          <TextComponent text={'|'} size={26} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <EvilIcons name="clock" size={30} color={'black'} />
            <TextComponent
              text={exercise.duration}
              unit={'min'}
              size={20}
              font={fontFamilies['medium']}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 26, marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              gap: 30,
            }}>
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={'Level'}
                size={15}
                styles={{marginBottom: 5}}
              />
              <View
                style={{borderRadius: 10, backgroundColor: colors['border']}}>
                <TextComponent
                  text={exercise?.level || 'BEGINNER'}
                  styles={styles.text}
                />
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={'Category'}
                size={15}
                styles={{marginBottom: 5}}
              />
              <View
                style={{borderRadius: 10, backgroundColor: colors['border']}}>
                <TextComponent
                  text={exercise.equipmentName}
                  styles={styles.text}
                />
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={'Weight'}
                size={15}
                styles={{marginBottom: 5}}
              />
              <View
                style={{borderRadius: 10, backgroundColor: colors['border']}}>
                <TextComponent text={exercise.weight} styles={styles.text} />
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <TextComponent
              text={exercise.name}
              size={20}
              font={fontFamilies['semibold']}
              styles={{width: width / 1.5, marginBottom: 5}}
              space={-0.8}
            />
            <TextComponent
              text={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.'
              }
              size={16}
              font={fontFamilies['regular']}
              styles={{width: width / 1.2, marginBottom: 5}}
            />
          </View>
          <View style={{marginVertical: 40}}>
            <Video
              style={styles.video}
              source={{uri: exercise.video_side}}
              isLooping
              useNativeControls
              onPlaybackStatusUpdate={setStatus}
              resizeMode="cover"
            />
            <SpaceComponent height={20} />
            <Video
              style={styles.video}
              source={{uri: exercise.video_center}}
              isLooping
              useNativeControls
              onPlaybackStatusUpdate={setStatus}
              resizeMode="cover"
            />
          </View>
          <CustomButton
            title={'START NOW'}
            handlePress={handleStart}
            containerStyles={{marginBottom: 40}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailExerciseScreen;

const styles = StyleSheet.create({
  text: {
    color: colors['text-2'],
    fontFamily: fontFamilies['regular'],
    fontSize: 16,
    padding: 20,
  },
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
