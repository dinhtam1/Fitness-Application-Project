import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontFamilies} from '../../../constants/fontFamilies';
import TextComponent from '../../../components/text/textComponent';
import {SimpleLineIcons} from '@expo/vector-icons';
import {FontAwesome6} from '@expo/vector-icons';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const MealFullImage = ({item, ...props}) => {
  const navigation = useNavigation();
  const handlePress = mealId => {
    navigation.navigate('DetailMeal', {mealId});
  };
  return (
    <TouchableOpacity
      style={{marginTop: 30}}
      key={item.mealId}
      onPress={() => handlePress(item.mealId)}>
      <Image
        src={item.meal_image}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 180,
          borderRadius: 10,
          backgroundColor: colors['border'],
        }}
      />
      <TextComponent
        size={17}
        text={item.meal_name}
        font={fontFamilies['medium']}
        styles={{marginVertical: 10}}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SimpleLineIcons
            name="fire"
            size={15}
            color={colors['color-icon-1']}
          />
          <TextComponent
            text={Math.floor(item.calories)}
            unit={'kcal'}
            size={16}
            styles={styles.text}
            color={colors['text']}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealFullImage;

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
  },
});
