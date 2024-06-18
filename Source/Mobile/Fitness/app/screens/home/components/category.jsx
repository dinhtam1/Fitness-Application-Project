import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RowComponent from '../../../components/common/rowComponent';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {navigator} from '../../../constants/text';

const Category = ({data, title, nav, ...props}) => {
  const navigation = useNavigation();

  const handleSelectCategory = category => {
    navigation.navigate(navigator['full-exercise'], {category});
  };

  return (
    <View>
      <RowComponent justify={'space-between'}>
        <TextComponent
          text={title}
          size={22}
          font={fontFamilies['bebasNeue']}
          color={colors['primary-color-black']}
          styles={{marginBottom: 10, marginTop: 20}}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(nav);
          }}>
          <TextComponent
            text={'See all'}
            font={fontFamilies['bold']}
            size={14}
            color={colors['primary-color-black']}
          />
        </TouchableOpacity>
      </RowComponent>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 10,
          marginBottom: 20,
        }}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleSelectCategory(item.equipmentName)}
            style={{alignItems: 'center'}}>
            <Image src={item.image} style={styles.image} resizeMode="cover" />
            <View>
              <TextComponent
                size={14}
                styles={styles.imageBtnTxt}
                text={item.equipmentName}
                font={fontFamilies['medium']}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  image: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  imageBtnTxt: {
    color: colors['primary-color-black'],
    textAlign: 'center',
    marginTop: 10,
  },
});
