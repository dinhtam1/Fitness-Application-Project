import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import CustomButton from '../../components/button/buttonComponent';

const data = [
  {
    text: 'Total time',
    value: '15 min',
  },
  {
    text: 'Total calories',
    value: '5 kcal',
  },
  {
    text: 'Level',
    value: 'Beginner',
  },
  {
    text: 'Category',
    value: 'Cardio',
  },
  {
    text: 'Weight',
    value: 'Lose',
  },
  {
    text: 'Total weight',
    value: '5 kg',
  },
];

const ResultScreen = () => {
  return (
    <SafeAreaView>
      <BackComponent title={'RESULT'} />
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <TextComponent
          text={'Workout'}
          size={20}
          font={fontFamilies['bold']}
          color={colors['title']}
        />
        <TextComponent
          text={'Exercises with Sitting Dumbbells'}
          size={17}
          font={fontFamilies['semibold']}
          color={colors['text-2']}
          styles={{marginTop: 10}}
        />
        <TextComponent
          text={'Completed on 24/12/2022'}
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
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: colors['primary-color-light'],
                width: 170,
                marginBottom: 30,
                alignItems: 'center',
                borderRadius: 10,
                paddingVertical: 20,
              }}>
              <TextComponent
                text={item.text}
                size={16}
                font={fontFamilies['semibold']}
                color={colors['text-3']}
              />
              <TextComponent
                text={item.value}
                size={17}
                font={fontFamilies['regular']}
                color={colors['text-2']}
              />
            </View>
          ))}
        </View>
        <CustomButton title={'SAVE'} containerStyles={{marginTop: 20}} />
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({});
