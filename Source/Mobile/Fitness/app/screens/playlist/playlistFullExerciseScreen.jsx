import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import {colors} from '../../constants/colors';
import {common} from '../../styles/commonStyles';
import AboutExercise from '../exercise/component/aboutExercise';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiExerciseInList} from '../../apis/exerciseList';
import CustomButton from '../../components/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';

const PlaylistFullExerciseScreen = ({route}) => {
  const navigation = useNavigation();
  const {exerciseListId, list_name} = route?.params;
  const {token} = useAuthStore();
  const {user} = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await apiExerciseInList(
        user.userId,
        token,
        exerciseListId,
      );
      if (response.statusCode === 200) {
        setExercises(response.data);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handlePress = () => {
    navigation.navigate('ProgressExercise', {
      exercises: exercises,
      single: false,
      namePlan: list_name,
    });
  };
  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent black back title={list_name} />
      <View style={{paddingHorizontal: 20, height: '100%'}}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors['primary']}
            style={{marginTop: 60}}
          />
        ) : (
          <>
            <AboutExercise data={exercises} plan={true} />
          </>
        )}
        <View style={{marginBottom: 30}}>
          <CustomButton title={'START NOW'} handlePress={() => handlePress()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlaylistFullExerciseScreen;

const styles = StyleSheet.create({});
