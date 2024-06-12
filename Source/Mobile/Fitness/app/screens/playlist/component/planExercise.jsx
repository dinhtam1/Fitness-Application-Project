import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {EvilIcons} from '@expo/vector-icons';
import {emptyFolder, exercise1} from '../../../assets';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const PlanExercise = data => {
  const navigation = useNavigation();
  return (
    <>
      {data.data.length > 0 ? (
        <>
          {data.data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('ExercisesInList', {
                  exerciseListId: item.exerciseListId,
                  list_name: item.list_name,
                })
              }
              style={{paddingVertical: 10}}>
              <Image
                src={item.cover_image}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: 180,
                  borderRadius: 10,
                  backgroundColor: colors['border'],
                }}
              />
              <TextComponent
                size={16}
                text={item.list_name}
                font={fontFamilies['semibold']}
                styles={{marginVertical: 10}}
              />
              <View style={{flexDirection: 'row'}}>
                <TextComponent
                  text={'10 exercises'}
                  font={fontFamilies['medium']}
                  size={14}
                />

                <View style={{flexDirection: 'row'}}>
                  <TextComponent
                    text={'|'}
                    font={fontFamilies['regular']}
                    size={14}
                    styles={{marginHorizontal: 10}}
                  />
                  <EvilIcons
                    name="clock"
                    size={24}
                    color={colors['color-icon-1']}
                  />
                  <TextComponent
                    text={`${item.totalDuration} min`}
                    font={fontFamilies['regular']}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <Image source={emptyFolder} style={styles.image} />
      )}
    </>
  );
};

export default PlanExercise;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
});
