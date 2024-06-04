import {View, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import HeaderFull from './components/headerFull';

import Banner from './components/banner';
import VerticalComponent from '../../components/common/verticalComponent';
import {exercise1, exercise2, meal1, meal2} from '../../assets';
import {
  useAuthStore,
  useCategoriesStore,
  useUserStore,
} from '../../store/useAuthStore';
import {apiCategory} from '../../apis';
import Category from './components/category';
import Goal from './components/goal';
import {titleHome} from '../../constants/text';
import {apiMeal} from '../../apis/meal';
import MealPlan from './components/mealPlan';
import moment from 'moment';
import Header from './components/header';

const HomePageScreen = () => {
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const {categories, setCategories} = useCategoriesStore();
  const [meals, setMeals] = useState([]);

  const scrollY = new Animated.Value(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCategory(user.userId, token);
      const meal = await apiMeal(user.userId, token, {
        limit: 2,
      });
      if (response.statusCode === 200 && meal.statusCode === 200) {
        setCategories(response.data);
        setMeals(meal.data.meals);
      }
    };
    fetchData();
  }, [token]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
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
            <HeaderFull background />
          </Animated.View>
          {/* <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [0, 1],
              }),
            }}>
            <Header background />
          </Animated.View> */}
          <Animated.View style={{paddingHorizontal: 20}}>
            <View style={{paddingLeft: 20}}>
              <Banner />
            </View>
            <Category
              all
              title={titleHome['title-2']}
              image
              data={categories}
              nav={'Category'}
            />
            {/* <VerticalComponent
              all
              full
              title={'Popular Exercise'}
              unit={'min'}
              nav={'FullExercise'}
            /> */}
            <MealPlan data={meals} />
            {/* <VerticalComponent title={'Additional Exercise'} unit={'kcal'} /> */}
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default HomePageScreen;
