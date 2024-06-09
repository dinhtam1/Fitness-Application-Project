import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import FormField from '../../components/form/formFieldComponent';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {useCategoriesStore} from '../../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';

const CategoryScreen = () => {
  const {categories} = useCategoriesStore();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: colors['background-white']}}>
      <BackComponent black back title={'CATEGORIES'} nav={'Main'} />
      <ScrollView>
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
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{marginBottom: 20}}
                onPress={() =>
                  navigation.navigate('FullExercise', {
                    category: item.equipmentName,
                  })
                }>
                <Image src={item.image} style={styles.image} />
                <TextComponent
                  size={14}
                  styles={styles.imageBtnTxt}
                  text={item.equipmentName}
                  font={fontFamilies['medium']}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;

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
});
