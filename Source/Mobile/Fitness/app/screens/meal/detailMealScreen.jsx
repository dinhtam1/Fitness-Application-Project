import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {exercise1, exercise2} from '../../assets';
import {SimpleLineIcons} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import CustomButton from '../../components/button/buttonComponent';
import MealComponent from './component/mealComponent';

const {width, height} = Dimensions.get('window');

const DetailMealScreen = () => {
  return (
    <ScrollView>
      <ImageBackground
        source={exercise2}
        style={{
          width: width,
          height: height / 2.8,
          backgroundColor: 'red',
        }}></ImageBackground>
      <View
        style={{
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
          gap: 30,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SimpleLineIcons
            name="fire"
            size={22}
            color={'black'}
            style={{marginRight: 5}}
          />
          <TextComponent
            text={'135'}
            unit={'kcal'}
            size={20}
            font={fontFamilies['medium']}
            color={colors['title']}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 26, marginTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 60,
            justifyContent: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'Fat'}
              size={15}
              styles={{marginBottom: 5}}
              font={fontFamilies['medium']}
            />
            <View>
              <TextComponent text={'1.5 g'} styles={styles.text} />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'Protein'}
              size={15}
              styles={{marginBottom: 5}}
              font={fontFamilies['medium']}
            />
            <View>
              <TextComponent text={'10.9 kg'} styles={styles.text} />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'Carbs'}
              size={15}
              styles={{marginBottom: 5}}
              font={fontFamilies['medium']}
            />
            <View>
              <TextComponent text={'13.5 g'} styles={styles.text} />
            </View>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <TextComponent
            text={'HEALTHY BALANCED VEGETARIAN FOOD'}
            size={20}
            font={fontFamilies['semibold']}
            styles={{width: width / 1.5, marginBottom: 5}}
            space={-0.8}
            color={colors['title']}
          />
          <TextComponent
            text={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.'
            }
            size={16}
            font={fontFamilies['regular']}
            styles={{width: width / 1.2, marginBottom: 5}}
          />
        </View>
        <View style={{marginTop: 40}}>
          <MealComponent />
        </View>
      </View>
    </ScrollView>
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
});
