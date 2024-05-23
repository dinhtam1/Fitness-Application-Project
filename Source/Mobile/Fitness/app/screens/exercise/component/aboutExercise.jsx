import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RowComponent from '../../../components/common/rowComponent';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {SimpleLineIcons} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const AboutExercise = ({data, ...props}) => {
  const navigation = useNavigation();
  const handleSelectCategory = index => {
    navigation.navigate('DetailExercise', {exerciseId: index});
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{marginTop: 20, marginBottom: 80}}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectCategory(item.exerciseId)}
          style={{marginBottom: 20}}>
          <RowComponent justify="flex-start" gap={30}>
            <Image
              src={item.image}
              resizeMode="cover"
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
              }}
            />
            <View style={{width: 200, minHeight: 120}}>
              <TextComponent
                text={item.name}
                size={16}
                font={fontFamilies['semibold']}
                color={colors['text-2']}
              />
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <SimpleLineIcons
                  name="fire"
                  size={18}
                  color={colors['text']}
                  style={{marginRight: 5}}
                />
                <TextComponent
                  text={item.caloriesBurned}
                  font={fontFamilies['regular']}
                  color={colors['text']}
                  size={14}
                  unit={'kcal'}
                />
                <TextComponent
                  text={'|'}
                  font={fontFamilies['regular']}
                  size={14}
                  styles={{marginHorizontal: 10}}
                />
                <EvilIcons name="clock" size={24} color={colors['text']} />
                <TextComponent
                  text={item.duration}
                  font={fontFamilies['regular']}
                  color={colors['text']}
                  size={14}
                  unit={'min'}
                />
              </View>
              <TextComponent
                text={item.level}
                font={fontFamilies['regular']}
                color={colors['text']}
                size={14}
              />
            </View>
          </RowComponent>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
export default AboutExercise;

const styles = StyleSheet.create({});
