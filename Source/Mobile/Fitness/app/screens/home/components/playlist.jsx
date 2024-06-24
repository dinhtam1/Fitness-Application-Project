import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {common} from '../../../styles/commonStyles';
import TextComponent from '../../../components/text/textComponent';
import {navigator, title} from '../../../constants/text';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {EvilIcons} from '@expo/vector-icons';

const Playlist = ({data}) => {
  const navigation = useNavigation();
  return (
    <>
      {data.length > 0 ? (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextComponent
              text={title['playlist']}
              size={22}
              font={fontFamilies['bebasNeue']}
              color={colors['primary-color-black']}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigator['playlist']);
              }}>
              <TextComponent
                text={'See all'}
                font={fontFamilies['bold']}
                size={14}
                color={colors['primary-color-black']}
              />
            </TouchableOpacity>
          </View>
          <View>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate(navigator['exercises-in-list'], {
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
                    text={item.quantityExercise + ' exercises'}
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
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: colors['border-3'],
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
});
