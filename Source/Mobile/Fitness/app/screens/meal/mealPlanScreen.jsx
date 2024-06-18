import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import BackComponent from '../../components/header/backComponent';
import CustomButton from '../../components/button/buttonComponent';
import React, {useEffect, useState} from 'react';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import MealFullImage from './component/mealFullImage';
import {useUserStore, useAuthStore} from '../../store/useAuthStore';
import {apiMeal} from '../../apis/meal';
import {colors} from '../../constants/colors';
import {common} from '../../styles/commonStyles';
import {title} from '../../constants/text';

const data = [
  {
    id: 1,
    meal_time: 'Breakfast',
  },
  {
    id: 2,
    meal_time: 'Lunch',
  },
  {
    id: 3,
    meal_time: 'Dinner',
  },
];

const MealPlanScreen = () => {
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const [mealData, setMealData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiMeal(user.userId, token, {time_meal: time});
      if (response.statusCode === 200) {
        setMealData(response.data.meals);
        setQuantity(response.data.mealCount);
      }
    };
    fetchData();
  }, [time]);

  const handlePress = (id, time) => {
    setTime(time.toLowerCase());
    setActiveId(id);
  };

  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent black back title={title['meal-plan']} />
      <View style={styles.container}>
        {data.map((item, index) => (
          <View key={item.id}>
            <CustomButton
              handlePress={() => handlePress(item.id, item.meal_time)}
              title={item.meal_time}
              containerStyles={
                activeId === item.id ? styles.button_active : styles.button
              }
              textStyles={
                activeId === item.id
                  ? styles.text_button_active
                  : styles.text_button
              }
            />
          </View>
        ))}
      </View>
      <View style={{marginTop: 20, marginBottom: 150, paddingHorizontal: 20}}>
        <TextComponent
          text={`${quantity} meals`}
          font={fontFamilies['semibold']}
          size={18}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {mealData.map((item, index) => (
            <MealFullImage key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MealPlanScreen;

const styles = StyleSheet.create({
  button: {
    width: 110,
    backgroundColor: colors['border-4'],
  },
  button_active: {
    width: 110,
  },
  text_button: {
    fontSize: 14,
    color: colors['text'],
  },
  text_button_active: {
    fontSize: 14,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
});
