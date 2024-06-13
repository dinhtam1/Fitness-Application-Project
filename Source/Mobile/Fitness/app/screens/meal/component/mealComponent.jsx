import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComponent from '../../../components/text/textComponent';
import {meal2} from '../../../assets';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import BorderComponent from '../../../components/common/borderComponent';
import {convertToString, getRandomElements} from '../../../utils/helper';
import {useMealsStore} from '../../../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';

const MealComponent = ({handlePress}) => {
  const {meals} = useMealsStore();
  return (
    <View
      style={{
        borderTopWidth: 1,
        paddingTop: 20,
        borderColor: colors['border'],
        marginBottom: 20,
      }}>
      <TextComponent text={'Meal Plan'} size={20} font={fontFamilies['bold']} />
      {meals.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(item.mealId)}>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              gap: 20,
            }}>
            <Image
              src={item.meal_image}
              style={styles.image}
              resizeMode="cover"
            />
            <View>
              <TextComponent
                text={convertToString(item.meal_name)}
                size={17}
                font={fontFamilies['semibold']}
                styles={{marginBottom: 10}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <TextComponent
                    text={'Fat'}
                    size={12}
                    styles={{marginBottom: 5}}
                    font={fontFamilies['medium']}
                  />
                  <View>
                    <TextComponent
                      text={`${Math.floor(item.fat)} g`}
                      styles={styles.text}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TextComponent
                    text={'Protein'}
                    size={12}
                    styles={{marginBottom: 5}}
                    font={fontFamilies['medium']}
                  />
                  <View>
                    <TextComponent
                      text={`${Math.floor(item.protein)} g`}
                      styles={styles.text}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TextComponent
                    text={'Carbs'}
                    size={12}
                    styles={{marginBottom: 5}}
                    font={fontFamilies['medium']}
                  />
                  <View>
                    <TextComponent
                      text={`${Math.floor(item.carb)} g`}
                      styles={styles.text}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TextComponent
                    text={'Others'}
                    size={12}
                    styles={{marginBottom: 5}}
                    font={fontFamilies['medium']}
                  />
                  <View>
                    <TextComponent
                      text={`${100 - Math.floor(item.carb) - Math.floor(item.protein) - Math.floor(item.fat)} g`}
                      styles={styles.text}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MealComponent;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: colors['border'],
  },
  text: {
    color: colors['text-2'],
    fontFamily: fontFamilies['medium'],
    fontSize: 13,
    marginTop: 10,
  },
});
