import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiExercises, apiMuscleName} from '../../apis/exercise';
import AboutExercise from './component/aboutExercise';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constants/colors';
import {common} from '../../styles/commonStyles';
import Modal from 'react-native-modal';

const FullExerciseScreen = ({route}) => {
  const {category} = route.params;
  const [exercises, setExercises] = useState([]);
  const [muscleName, setMuscleName] = useState([]);
  const {token} = useAuthStore();
  const {user} = useUserStore();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await apiExercises(user.userId, token, {
        category: category,
        muscle_name: value,
      });
      const muscleName = await apiMuscleName(user.userId, token);
      if (response.statusCode === 200 && muscleName.statusCode === 200) {
        setMuscleName(muscleName.data);
        setExercises(response.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [value]);

  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent black back title={'FULL EXERCISE'} nav={'Home'} />
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.container}>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: colors['primary-color-black']},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={muscleName}
            maxHeight={200}
            labelField="musclesName"
            valueField="musclesName"
            placeholder={!isFocus ? 'All' : ''}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.musclesName);
              setIsFocus(false);
            }}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors['primary']}
            style={{marginTop: 60}}
          />
        ) : (
          <>
            <AboutExercise handlePress={toggleModal} data={exercises} />
          </>
        )}
      </View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            height: 400,
            width: '100%',
            backgroundColor: 'white',
          }}>
          <Text>Hello!</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FullExerciseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
