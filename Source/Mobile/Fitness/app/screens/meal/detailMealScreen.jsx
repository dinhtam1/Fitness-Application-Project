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
import {exercise1, exercise2} from '../../assets';
import {SimpleLineIcons} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import CustomButton from '../../components/button/buttonComponent';
import MealComponent from './component/mealComponent';
import {apiDetailMeal, apiMeal} from '../../apis/meal';
import {
  useAuthStore,
  useMealsStore,
  useUserStore,
} from '../../store/useAuthStore';
import BackComponent from '../../components/header/backComponent';
import {apiUpdateDashboard} from '../../apis/dashboard';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {button, navigator, text} from '../../constants/text';

const {width, height} = Dimensions.get('window');

const DetailMealScreen = ({route}) => {
  const initialMealId = route?.params?.mealId;
  const navigation = useNavigation();
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const {setMeals} = useMealsStore();
  const [meal, setMeal] = useState({});
  const [mealId, setMealId] = useState(initialMealId);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiDetailMeal(user.userId, token, mealId);
      const response1 = await apiMeal(user.userId, token, {
        return_random: true,
        limit: 3,
      });
      if (response.statusCode === 200 && response1.statusCode === 200) {
        setMeal(response.data);
        setMeals(response1.data.meals);
      }
    };
    fetchData();
  }, [mealId]);

  const handlePress = mealId => {
    setMealId(mealId);
  };

  const handleEat = async () => {
    const response = await apiUpdateDashboard(user.userId, token, {
      calories_loaded: meal.calories,
    });
    if (response.statusCode === 200) {
      Toast.show(
        toastConfig({
          type: 'success',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
      navigation.navigate(navigator['main']);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <BackComponent black back title={meal.meal_name} />
      <ScrollView style={{backgroundColor: 'white'}}>
        <ImageBackground
          src={meal.meal_image}
          style={styles.image_main}></ImageBackground>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SimpleLineIcons
              name="fire"
              size={22}
              color={'black'}
              style={{marginRight: 5}}
            />
            <TextComponent
              text={`${Math.floor(meal.calories)}`}
              unit={text['kcal']}
              size={20}
              font={fontFamilies['medium']}
              color={colors['title']}
            />
          </View>
          <View style={{position: 'absolute', right: 80, bottom: 42}}>
            <TextComponent text={`/100g`} size={12} />
          </View>
        </View>
        <View style={{paddingHorizontal: 26, marginVertical: 40}}>
          <View
            style={{
              flexDirection: 'row',
              gap: 40,
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={text['fat']}
                size={15}
                styles={{marginBottom: 5}}
                font={fontFamilies['medium']}
              />
              <View>
                <TextComponent
                  text={`${Math.floor(meal.fat)} g`}
                  styles={styles.text}
                />
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={text['protein']}
                size={15}
                styles={{marginBottom: 5}}
                font={fontFamilies['medium']}
              />
              <View>
                <TextComponent
                  text={`${Math.floor(meal.protein)} g`}
                  styles={styles.text}
                />
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={text['carbs']}
                size={15}
                styles={{marginBottom: 5}}
                font={fontFamilies['medium']}
              />
              <View>
                <TextComponent
                  text={`${Math.floor(meal.carb)} g`}
                  styles={styles.text}
                />
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TextComponent
                text={text['others']}
                size={15}
                styles={{marginBottom: 5}}
                font={fontFamilies['medium']}
              />
              <View>
                <TextComponent
                  text={`${100 - Math.floor(meal.carb) - Math.floor(meal.protein) - Math.floor(meal.fat)} g`}
                  styles={styles.text}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <TextComponent
              text={meal.meal_name}
              size={20}
              font={fontFamilies['semibold']}
              styles={{width: width / 1.5, marginBottom: 5}}
              space={-0.8}
              color={colors['title']}
            />
            <TextComponent
              text={meal.description}
              size={16}
              font={fontFamilies['regular']}
              styles={{width: width / 1.2, marginBottom: 5}}
            />
          </View>
          <View style={{marginTop: 40}}>
            <MealComponent handlePress={handlePress} />
          </View>
          <CustomButton handlePress={handleEat} title={button['eat']} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailMealScreen;

const styles = StyleSheet.create({
  text: {
    color: colors['text-2'],
    fontFamily: fontFamilies['medium'],
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: width - 2 * 26,
    borderRadius: 10,
    height: 200,
    marginBottom: 30,
  },
  image_main: {
    width: width,
    height: height / 2.8,
    backgroundColor: colors['border'],
  },
  content: {
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
  },
});