import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import HorizontalComponent from '../../components/common/horizontalComponent';
import VerticalComponent from '../../components/common/verticalComponent';
import {exercise1, exercise2} from '../../assets';

const dataLevel = [
  {
    id: 1,
    text: 'Beginner',
  },
  {
    id: 2,
    text: 'Intermediate',
  },
  {
    id: 3,
    text: 'Advanced',
  },
];

const dataGoal = [
  {
    id: 1,
    text: 'Full Shot Man Stretching Arm',
    level: 'Beginner',
    minutes: '30',
    image: exercise1,
  },
  {
    id: 2,
    text: 'Athlete Practicing Monochrome',
    level: 'Beginner',
    minutes: '30',
    image: exercise2,
  },
  {
    id: 3,
    text: 'Athlete Practicing Monochrome',
    level: 'Beginner',
    minutes: '30',
    image: exercise2,
  },
  {
    id: 4,
    text: 'Athlete Practicing Monochrome',
    level: 'Beginner',
    minutes: '30',
    image: exercise2,
  },
];

const TrainingScreen = () => {
  return (
    <SafeAreaView>
      <BackComponent black back title={'TRAINING'} filter nav={'Main'} />
      <ScrollView style={{paddingHorizontal: 20}}>
        <HorizontalComponent data={dataLevel} />
        <VerticalComponent padleft={20} full title={'Popular Training'} />
        <HorizontalComponent
          widthImage={120}
          heightImage={160}
          radius={20}
          padleft={20}
          data={dataGoal}
          title={'Just for you'}
          image
          relative
          absolute
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrainingScreen;
