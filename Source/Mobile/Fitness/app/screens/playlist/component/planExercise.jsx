import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {EvilIcons} from '@expo/vector-icons';
import {emptyFolder, exercise1} from '../../../assets';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import ModalChoices from './modalChoices';

const PlanExercise = data => {
  const navigation = useNavigation();

  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleConfirm = async () => {
    hideAlert();
  };

  return (
    <>
      <ModalChoices
        isVisible={isAlertVisible}
        onClose={hideAlert}
        title="Delete!"
        message="Are you sure you want to Delete?"
        onConfirm={handleConfirm}
      />
      {data.data.length > 0 ? (
        <>
          {data.data.map((item, index) => (
            <TouchableOpacity
              onLongPress={() => showAlert()}
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
  modalContent: {
    height: 120,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'transparent',
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors['text'],
  },
});
