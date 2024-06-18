import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RowComponent from '../../../components/common/rowComponent';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {SimpleLineIcons} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {emptyFolder} from '../../../assets';
import ModalChoices from '../../playlist/component/modalChoices';
import {apiDeleteExerciseInList} from '../../../apis/exerciseList';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../utils/toast';
import {useAuthStore, useUserStore} from '../../../store/useAuthStore';
import {message, navigator, title} from '../../../constants/text';

const AboutExercise = ({
  data,
  handlePress,
  add,
  plan,
  playlistId,
  reload,
  ...props
}) => {
  const navigation = useNavigation();
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const [index, setIndex] = useState(0);
  const handleSelectCategory = index => {
    navigation.navigate(navigator['detail-exercise'], {exerciseId: index});
  };

  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlert = index => {
    setIndex(index);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleConfirm = async () => {
    const response = await apiDeleteExerciseInList(
      user.userId,
      token,
      playlistId,
      {
        exerciseId: data[index].exerciseId,
      },
    );
    if (response.statusCode === 200) {
      reload(true);
      Toast.show(
        toastConfig({
          type: 'success',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
    }
    hideAlert();
  };

  return (
    <>
      {plan ? (
        <ModalChoices
          isVisible={isAlertVisible}
          onClose={hideAlert}
          title={title['delete']}
          message={message['delete']}
          onConfirm={handleConfirm}
        />
      ) : (
        <></>
      )}
      {data.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          {data.map((item, index) => (
            <TouchableOpacity
              onLongPress={() => showAlert(index)}
              key={index}
              onPress={() => handleSelectCategory(item.exerciseId)}
              style={{marginBottom: 20}}>
              <RowComponent justify="flex-start" gap={30}>
                <ImageBackground
                  source={{uri: item.image}}
                  resizeMode="cover"
                  style={styles.image_main}
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
                  <View style={styles.content_below}>
                    <TextComponent
                      text={item.level}
                      font={fontFamilies['regular']}
                      color={colors['text']}
                      size={14}
                    />
                    {add ? (
                      <TouchableOpacity
                        style={styles.button_add}
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
  button_add: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: colors['primary-color'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  content_below: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_main: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: colors['border'],
  },
});
