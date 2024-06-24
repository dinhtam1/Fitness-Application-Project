import {View, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import HeaderFull from './components/headerFull';
import Banner from './components/banner';
import {
  useAuthStore,
  useCategoriesStore,
  useUserStore,
} from '../../store/useAuthStore';
import {apiCategory, apiExercises} from '../../apis';
import Category from './components/category';
import {titleHome} from '../../constants/text';
import {apiMeal} from '../../apis/meal';
import MealPlan from './components/mealPlan';
import Header from './components/header';
import Playlist from './components/playlist';
import {apiGetAllLists} from '../../apis/exerciseList';

const HomePageScreen = () => {
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const {categories, setCategories} = useCategoriesStore();
  const [meals, setMeals] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const scrollY = new Animated.Value(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCategory(user?.userId, token);
      const meal = await apiMeal(user?.userId, token, {
        limit: 2,
      });
      const playlists = await apiGetAllLists(user?.userId, token);
      if (response.statusCode === 200 && meal.statusCode === 200) {
        setCategories(response.data);
        setMeals(meal.data.meals);
        setPlaylists(playlists.data);
      }
    };
    fetchData();
  }, [user]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: -50,
            left: 0,
            right: 0,
            zIndex: 1,
            opacity: scrollY.interpolate({
              inputRange: [0, 150],
              outputRange: [0, 1],
            }),
          }}>
          <Header />
        </Animated.View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}>
          <View style={[globalStyles.container]}>
            <Animated.View
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [0, 150],
                  outputRange: [1, 0],
                }),
              }}>
              <HeaderFull background />
            </Animated.View>
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
              <MealPlan data={meals} />
              <Playlist data={playlists} />
            </Animated.View>
          </View>
        </Animated.ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};

export default HomePageScreen;
