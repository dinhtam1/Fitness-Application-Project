import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import CustomButton from '../../components/button/buttonComponent';
import moment from 'moment';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiUpdateDashboard} from '../../apis/dashboard';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {useNavigation} from '@react-navigation/native';
import {common} from '../../styles/commonStyles';

const ResultScreen = ({route}) => {
  const navigation = useNavigation();
  const {exercise} = route.params;
  const {user} = useUserStore();
  const {token} = useAuthStore();

  const handlePress = async () => {
    const response = await apiUpdateDashboard(user.userId, token, {
      time_practice: exercise.duration,
      calories_burned: exercise.caloriesBurned,
    });
    if (response?.statusCode === 200) {
      Toast.show(
        toastConfig({
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
      navigation.navigate('Home');
    }
  };
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent black back title={'RESULT'} />
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <TextComponent
          text={'Workout'}
          size={20}
          font={fontFamilies['bold']}
          color={colors['title']}
        />
        <TextComponent
          text={`Exercises with ${exercise.name}`}
          size={17}
          font={fontFamilies['semibold']}
          color={colors['text-2']}
          styles={{marginTop: 10}}
        />
        <TextComponent
          text={`Completed on ${moment().format('L')}`}
          size={17}
          styles={{marginTop: 10}}
        />
        <TextComponent
          text={'Workout summary'}
          size={20}
          font={fontFamilies['bold']}
          color={colors['title']}
          styles={{marginTop: 30}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
            flexWrap: 'wrap',
          }}>
          <View style={styles.container}>
            <TextComponent
              text={'Total Time'}
              size={16}
              font={fontFamilies['semibold']}
              color={colors['text-3']}
            />
            <TextComponent
              text={exercise.duration}
              size={17}
              font={fontFamilies['regular']}
              color={colors['text-2']}
              unit={'min'}
              styles={styles.text}
            />
          </View>
          <View style={styles.container}>
            <TextComponent
              text={'Total Calories'}
              size={16}
              font={fontFamilies['semibold']}
              color={colors['text-3']}
            />
            <TextComponent
              text={exercise.caloriesBurned}
              size={17}
              font={fontFamilies['regular']}
              color={colors['text-2']}
              unit={'kcal'}
              styles={styles.text}
            />
          </View>
          <View style={styles.container}>
            <TextComponent
              text={'Total Level'}
              size={16}
              font={fontFamilies['semibold']}
              color={colors['text-3']}
            />
            <TextComponent
              text={exercise.level}
              size={17}
              font={fontFamilies['regular']}
              color={colors['text-2']}
              styles={styles.text}
            />
          </View>
          <View style={styles.container}>
            <TextComponent
              text={'Category'}
              size={16}
              font={fontFamilies['semibold']}
              color={colors['text-3']}
            />
            <TextComponent
              text={exercise.equipmentName}
              size={17}
              font={fontFamilies['regular']}
              color={colors['text-2']}
              styles={styles.text}
            />
          </View>
          <View style={styles.container}>
            <TextComponent
              text={'Weight'}
              size={16}
              font={fontFamilies['semibold']}
              color={colors['text-3']}
            />
            <TextComponent
              text={exercise.weight}
              size={17}
              font={fontFamilies['regular']}
              color={colors['text-2']}
              styles={styles.text}
            />
          </View>
          <View style={styles.container}>
            <TextComponent
              text={'Total Weight'}
              size={16}
              font={fontFamilies['semibold']}
              color={colors['text-3']}
            />
            <TextComponent
              text={user.weight}
              size={17}
              font={fontFamilies['regular']}
              color={colors['text-2']}
              unit={'kg'}
              styles={styles.text}
            />
          </View>
        </View>
        <CustomButton
          handlePress={handlePress}
          title={'SAVE'}
          containerStyles={{marginTop: 20}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['border-4'],
    width: 150,
    marginBottom: 30,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
  },
  text: {
    marginTop: 5,
  },
});
