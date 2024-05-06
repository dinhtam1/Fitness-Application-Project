import {View, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Header from './components/header';

import Banner from './components/banner';
import Category from './components/catgoriesHorizontal';
import CategoryHorizontal from './components/catgoriesHorizontal';
import CategoryVertical from './components/categoriesVertical';

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
            <CategoryHorizontal title={'SELECT YOUR GOAL'} />
            <CategoryHorizontal title={'CATEGORY'} image />
            <CategoryVertical title={'Popular Exercise'} unit={'min'} />
            <CategoryVertical title={'Meal Plans'} meal unit={'kcal'} />
            <CategoryVertical title={'Additional Exercise'} unit={'kcal'} />
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default HomePageSceen;
