import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextComponent from '../../../components/text/textComponent';
import {meal2} from '../../../assets';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import BorderComponent from '../../../components/common/borderComponent';

const MealComponent = () => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        paddingTop: 20,
        borderColor: colors['border'],
        marginBottom: 40,
      }}>
      <TextComponent text={'Meal Plan'} size={20} font={fontFamilies['bold']} />
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          gap: 20,
        }}>
        <Image source={meal2} style={styles.image} resizeMode="cover" />
        <View>
          <TextComponent
            text={'Breakfast'}
            size={17}
            font={fontFamilies['semibold']}
            styles={{marginBottom: 10}}
          />
          <View
            style={{
              flexDirection: 'row',
              gap: 30,
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
        </View>
      </View>
      <BorderComponent bottom padding={10} color={colors['border']} />
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          gap: 20,
        }}>
        <Image source={meal2} style={styles.image} resizeMode="cover" />
        <View>
          <TextComponent
            text={'Breakfast'}
            size={17}
            font={fontFamilies['semibold']}
            styles={{marginBottom: 10}}
          />
          <View
            style={{
              flexDirection: 'row',
              gap: 30,
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
        </View>
      </View>
    </View>
  );
};

export default MealComponent;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  text: {
    color: colors['text-2'],
    fontFamily: fontFamilies['medium'],
    fontSize: 16,
    marginTop: 10,
  },
});
