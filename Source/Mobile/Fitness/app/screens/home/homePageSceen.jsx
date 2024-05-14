import {View, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Header from './components/header';

import Banner from './components/banner';
import HorizontalComponent from '../../components/common/horizontalComponent';
import VerticalComponent from '../../components/common/verticalComponent';
import {exercise1, exercise2, meal1, meal2} from '../../assets';

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

const dataMeal = [
  {
    id: 1,
    text: 'Greek salad with lettuce, green onion',
    calo: 150,
    image: meal1,
  },
  {
    id: 2,
    text: 'Greek salad with lettuce, green onion',
    calo: 150,
    image: meal2,
  },
];

const dataGoal1 = [
  {
    id: 1,
    text: 'Loose Weight',
  },
  {
    id: 2,
    text: 'Gain Weight',
  },
  {
    id: 3,
    text: 'Build Muscle',
  },
  {
    id: 4,
    text: 'Stay Fit',
  },
  {
    id: 5,
    text: 'Stay Healthy',
  },
  {
    id: 6,
    text: 'Body Building',
  },
];

const dataCategories = [
  {
    id: 1,
    text: 'Cardio',
  },
  {
    id: 2,
    text: 'Strength',
  },
  {
    id: 3,
    text: 'Yoga',
  },
  {
    id: 4,
    text: 'Pilates',
  },
  {
    id: 5,
    text: 'Crossfit',
  },
  {
    id: 6,
    text: 'Zumba',
  },
];

const HomePageSceen = () => {
  const scrollY = new Animated.Value(0);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <View style={[globalStyles.container, {position: 'relative'}]}>
          <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [1, 0],
              }),
            }}>
            <Header backround />
          </Animated.View>
          <Animated.View style={{paddingLeft: 40, paddingRight: 20}}>
            <Banner />
            <HorizontalComponent data={dataGoal1} title={'SELECT YOUR GOAL'} />
            <HorizontalComponent
              all
              title={'CATEGORY'}
              image
              data={dataCategories}
              nav={'Category'}
            />
            <VerticalComponent
              all
              full
              title={'Popular Exercise'}
              unit={'min'}
              nav={'FullExercise'}
            />
            <VerticalComponent
              full
              title={'Meal Plans'}
              meal
              all
              unit={'kcal'}
              data={dataMeal}
            />
            <VerticalComponent title={'Additional Exercise'} unit={'kcal'} />
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default HomePageSceen;
