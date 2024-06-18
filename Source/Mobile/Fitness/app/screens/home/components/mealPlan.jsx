import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {convertToString} from '../../../utils/helper';
import {navigator, title} from '../../../constants/text';

const MealPlan = ({data, ...props}) => {
  const navigation = useNavigation();

  const handlePress = mealId => {
    navigation.navigate(navigator['detail-meal'], {mealId});
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextComponent
          text={title['meal-plan']}
          size={22}
          font={fontFamilies['bebasNeue']}
          color={colors['primary-color-black']}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Meal');
          }}>
          <TextComponent
            text={'See all'}
            font={fontFamilies['bold']}
            size={14}
            color={colors['primary-color-black']}
          />
        </TouchableOpacity>
      </View>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(item.mealId)}
          style={{marginTop: 20}}>
          <Image
            src={item.meal_image}
            resizeMode="cover"
            style={styles.image}
          />
          <TextComponent
            text={convertToString(item.meal_name)}
            size={14}
            font={fontFamilies['semibold']}
            styles={{marginTop: 10, marginBottom: 5}}
          />
          <TextComponent
            text={`${Math.floor(item.calories)} kcal`}
            size={14}
            font={fontFamilies['regular']}
            styles={{marginBottom: 5}}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MealPlan;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    backgroundColor: colors['border-3'],
  },
  container: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: colors['border-3'],
  },
});
