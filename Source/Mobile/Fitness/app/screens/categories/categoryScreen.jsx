import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import FormField from '../../components/form/formFieldComponent';
import {exercise2} from '../../assets';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';

const dataCategories = [
  {
    id: 1,
    text: 'Cardio',
  },
  {
    id: 2,
    text: 'Strength',
  },
  {
    id: 3,
    text: 'Yoga',
  },
  {
    id: 4,
    text: 'Pilates',
  },
  {
    id: 5,
    text: 'Crossfit',
  },
  {
    id: 6,
    text: 'Zumba',
  },
];

const CategorySceen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SafeAreaView>
      <BackComponent title={'CATEGORIES'} />
      <View style={{paddingHorizontal: 20}}>
        <FormField
          placeholder={'Search'}
          icon={'search'}
          otherStyles={{marginTop: 0}}
        />
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {dataCategories.map((item, index) => (
            <TouchableOpacity
              // ref={el => (itemRef.current[index] = el)}
              // onPress={() => handleSelectCategory(index)}
              style={{marginBottom: 20}}>
              <Image source={exercise2} style={styles.image} />
              <TextComponent
                size={14}
                styles={[
                  activeIndex === index
                    ? styles.imageBtnTxtActive
                    : styles.imageBtnTxt,
                  {
                    marginTop: 20,
                  },
                ]}
                text={item.text}
                font={fontFamilies['medium']}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategorySceen;

const styles = StyleSheet.create({
  image: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 120,
    width: 120,
  },
  imageBtnTxt: {
    color: colors['primary-color-black'],
    textAlign: 'center',
    marginTop: 10,
  },
  imageBtnTxtActive: {
    color: colors['primary-color-black'],
    textAlign: 'center',
    marginTop: 10,
  },
});
