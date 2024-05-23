import {View, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Header from './components/header';

import Banner from './components/banner';
import HorizontalComponent from '../../components/common/horizontalComponent';
import VerticalComponent from '../../components/common/verticalComponent';
import {exercise1, exercise2, meal1, meal2} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStore} from 'zustand';
import {
  useAuthStore,
  useCategoriesStore,
  useUserStore,
} from '../../store/useAuthStore';
import {apiCategory} from '../../apis';
import Category from './components/category';
import TextComponent from '../../components/text/textComponent';
import Goal from './components/goal';
import {titleHome} from '../../constants/text';

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

const HomePageScreen = () => {
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const {categories, setCategories} = useCategoriesStore();

  const scrollY = new Animated.Value(0);

  useEffect(() => {
    const fetchData = async token => {
      const response = await apiCategory(user.userId, token);
      if (response.statusCode === 200) {
        setCategories(response.data);
      }
    };
    if (token) {
      fetchData(token);
    }
  }, [token]);
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
            <Header background />
          </Animated.View>
          <Animated.View style={{paddingLeft: 40, paddingRight: 20}}>
            <Banner />
            <Goal title={titleHome['title-1']} />
            <Category
              all
              title={titleHome['title-2']}
              image
              data={categories}
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

export default HomePageScreen;
