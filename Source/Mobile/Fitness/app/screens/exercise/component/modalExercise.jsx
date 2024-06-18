import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import TextComponent from '../../../components/text/textComponent';
import CustomButton from '../../../components/button/buttonComponent';
import {Entypo} from '@expo/vector-icons';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';
import {apiAddExercise, apiGetAllLists} from '../../../apis/exerciseList';
import {useAuthStore, useUserStore} from '../../../store/useAuthStore';
import Toast from 'react-native-toast-message';
import {empty} from '../../../assets';
import {button, title} from '../../../constants/text';
const {toastConfig} = require('../../../utils/toast');

const ModalExercise = ({isModalVisible, handleToggle, exerciseId}) => {
  const navigation = useNavigation();
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetAllLists(user.userId, token);
      if (response.statusCode === 200) {
        setChoices(response.data);
      }
    };
    fetchData();
  }, [isModalVisible]);

  const handleSelect = id => {
    if (selectedChoices.includes(id)) {
      setSelectedChoices(selectedChoices.filter(choice => choice !== id));
    } else {
      setSelectedChoices([...selectedChoices, id]);
    }
  };

  const handleSave = async () => {
    const response = await apiAddExercise(user.userId, token, {
      exerciseListId: selectedChoices,
      exerciseId: +exerciseId,
    });
    if (response.statusCode === 200) {
      Toast.show(
        toastConfig({
          type: 'success',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
      handleToggle();
    } else {
      Toast.show(
        toastConfig({
          type: 'error',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={{paddingHorizontal: 0}}
      onBackdropPress={() => handleToggle()}>
      <View style={styles.modalContent}>
        <TextComponent
          text={title['save-exercise']}
          font={fontFamilies['bebasNeue']}
          size={26}
          styles={{marginTop: 20, alignSelf: 'center'}}
        />
        {choices.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {choices.map((choice, index) => (
              <TouchableOpacity
                key={choice.exerciseListId}
                style={styles.choice}
                onPress={() => handleSelect(choice.exerciseListId)}>
                <View
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: selectedChoices.includes(
                      choice.exerciseListId,
                    )
                      ? colors['primary-color']
                      : 'transparent',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: selectedChoices.includes(choice.exerciseListId)
                      ? 0
                      : 2,
                  }}>
                  <TextComponent
                    text={
                      selectedChoices.includes(choice.exerciseListId) ? '✓' : ''
                    }
                    color={colors['text-white']}
                    size={18}
                  />
                </View>
                <TextComponent
                  text={choice.list_name}
                  size={19}
                  numOfLine={1}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Image source={empty} style={styles.image} resizeMode="cover" />
        )}
        <CustomButton
          handlePress={handleSave}
          title={'SAVE'}
          containerStyles={{marginTop: 20}}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreatePlan'), handleToggle();
          }}
          style={styles.content_below}>
          <TextComponent
            text={button['create-plan']}
            size={27}
            font={fontFamilies['bebasNeue']}
          />
          <View style={styles.content_below_icon}>
            <Entypo name="plus" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalExercise;

const styles = StyleSheet.create({
  modalContent: {
    height: 400,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
  },
  choiceText: {
    fontSize: 16,
  },
  selectedCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  content_below: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    alignSelf: 'center',
  },
  content_below_icon: {
    backgroundColor: colors['primary-color'],
    width: 25,
    height: 25,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});
