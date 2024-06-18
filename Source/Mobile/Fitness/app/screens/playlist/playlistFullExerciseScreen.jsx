import {
  ActivityIndicator,
  Image,
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
import {empty} from '../../assets';
import {button, navigator} from '../../constants/text';

const PlaylistFullExerciseScreen = ({route}) => {
  const navigation = useNavigation();
  const {exerciseListId, list_name} = route?.params;
  const {token} = useAuthStore();
  const {user} = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [isReload, setIsReload] = useState(false);
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
  }, [isReload]);

  const handlePress = () => {
    navigation.navigate(navigator['progress-exercise'], {
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
            {exercises.length > 0 ? (
              <>
                <AboutExercise
                  data={exercises}
                  plan={true}
                  playlistId={exerciseListId}
                  reload={setIsReload}
                />
                <View style={{marginBottom: 30}}>
                  <CustomButton
                    title={button['start-now']}
                    handlePress={() => handlePress()}
                  />
                </View>
              </>
            ) : (
              <Image source={empty} style={styles.image} />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PlaylistFullExerciseScreen;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
});
