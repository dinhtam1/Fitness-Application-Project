import {
  Image,
  ImageBackground,
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
import {Entypo} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {emptyFolder} from '../../../assets';

const AboutExercise = ({data, handlePress, add, ...props}) => {
  const navigation = useNavigation();
  const handleSelectCategory = index => {
    navigation.navigate('DetailExercise', {exerciseId: index});
  };

  return (
    <>
      {data.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectCategory(item.exerciseId)}
              style={{marginBottom: 20}}>
              <RowComponent justify="flex-start" gap={30}>
                <ImageBackground
                  source={{uri: item.image}}
                  resizeMode="cover"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 10,
                    backgroundColor: colors['border'],
                  }}
                  imageStyle={{borderRadius: 10}}></ImageBackground>
                <View style={{width: 200, minHeight: 120}}>
                  <TextComponent
                    text={item.name}
                    size={16}
                    font={fontFamilies['semibold']}
                    color={colors['text-2']}
                    styles={{minHeight: 40}}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TextComponent
                      text={item.level}
                      font={fontFamilies['regular']}
                      color={colors['text']}
                      size={14}
                    />
                    {add ? (
                      <TouchableOpacity
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          backgroundColor: colors['primary-color'],
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => handlePress(item.exerciseId)}>
                        <Entypo name="plus" size={24} color="white" />
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </RowComponent>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Image source={emptyFolder} style={styles.image} />
      )}
    </>
  );
};
export default AboutExercise;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
});
