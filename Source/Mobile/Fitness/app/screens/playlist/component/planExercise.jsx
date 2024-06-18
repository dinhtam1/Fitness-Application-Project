import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {EvilIcons} from '@expo/vector-icons';
import {empty} from '../../../assets';
import {colors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import ModalChoices from './modalChoices';
import {apiDeletePlaylist, apiGetAllLists} from '../../../apis/exerciseList';
import {useAuthStore, useUserStore} from '../../../store/useAuthStore';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../utils/toast';
import {message, navigator, title} from '../../../constants/text';

const PlanExercise = () => {
  const navigation = useNavigation();
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const [playlist, setPlaylist] = useState([]);
  const [isReload, setIsReload] = useState(false);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetAllLists(user.userId, token);
      if (response.statusCode === 200) {
        setPlaylist(response.data);
      }
    };

    fetchData();
  }, [isReload]);

  const showAlert = index => {
    setIndex(index);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleConfirm = async () => {
    const response = await apiDeletePlaylist(
      user.userId,
      token,
      playlist[index].exerciseListId,
    );
    if (response.statusCode === 200) {
      Toast.show(
        toastConfig({
          type: 'success',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
    }
    setIsReload(!isReload);
    hideAlert();
  };

  return (
    <>
      <ModalChoices
        isVisible={isAlertVisible}
        onClose={hideAlert}
        title={title['delete']}
        message={message['delete']}
        onConfirm={handleConfirm}
      />
      {playlist.length > 0 ? (
        <>
          {playlist.map((item, index) => (
            <TouchableOpacity
              onLongPress={() => showAlert(index)}
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
        </>
      ) : (
        <Image source={empty} style={styles.image} />
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
