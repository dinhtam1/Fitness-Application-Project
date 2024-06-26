import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import PlanExercise from './component/planExercise';
import {common} from '../../styles/commonStyles';
import {Entypo} from '@expo/vector-icons';
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {navigator, title} from '../../constants/text';

const {width, height} = Dimensions.get('window');

const PlaylistScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent black back title={title['workout-plan']} />
      <View style={{paddingHorizontal: 20, height: '100%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 20}}>
            <PlanExercise />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate(navigator['create-plan'])}
          style={styles.button}>
          <Entypo name="plus" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: 55,
    borderRadius: 100,
    backgroundColor: colors['primary-color-black'],
    position: 'absolute',
    bottom: height * 0.2,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
