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
import {exercise1, exercise2, header} from '../../assets';
import {SimpleLineIcons} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import CustomButton from '../../components/button/buttonComponent';
import {fontFamilies} from '../../constants/fontFamilies';
const {width, height} = Dimensions.get('window');

const DetailExerciseScreen = () => {
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
          />
        </View>
        <TextComponent text={'|'} size={26} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <EvilIcons name="clock" size={30} color={'black'} />
          <TextComponent
            text={'135'}
            unit={'min'}
            size={20}
            font={fontFamilies['medium']}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 26, marginTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 30,
          }}>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'Level'}
              size={15}
              styles={{marginBottom: 5}}
            />
            <View style={{borderRadius: 10, backgroundColor: colors['border']}}>
              <TextComponent text={'Beginner'} styles={styles.text} />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'Category'}
              size={15}
              styles={{marginBottom: 5}}
            />
            <View style={{borderRadius: 10, backgroundColor: colors['border']}}>
              <TextComponent text={'Cardio'} styles={styles.text} />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={'Weight'}
              size={15}
              styles={{marginBottom: 5}}
            />
            <View style={{borderRadius: 10, backgroundColor: colors['border']}}>
              <TextComponent text={'Lose'} styles={styles.text} />
            </View>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <TextComponent
            text={'EXERCISES WITH SITTING DUMBELLS'}
            size={20}
            font={fontFamilies['semibold']}
            styles={{width: width / 1.5, marginBottom: 5}}
            space={-0.8}
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
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
          <Image source={exercise1} style={styles.image} resizeMethod="cover" />
        </View>
        <CustomButton
          title={'START NOW'}
          containerStyles={{marginBottom: 40}}
        />
      </View>
    </ScrollView>
  );
};

export default DetailExerciseScreen;

const styles = StyleSheet.create({
  text: {
    color: colors['text-2'],
    fontFamily: fontFamilies['regular'],
    fontSize: 16,
    padding: 20,
  },
  image: {
    width: width - 2 * 26,
    borderRadius: 10,
    height: 200,
    marginBottom: 30,
  },
});
