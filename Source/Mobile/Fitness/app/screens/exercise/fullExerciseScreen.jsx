import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import FormField from '../../components/form/formFieldComponent';
import VerticalComponent from '../../components/common/verticalComponent';

const FullExerciseScreen = () => {
  return (
    <SafeAreaView>
      <BackComponent title={'FULL EXERCISE'} />
      <View style={{paddingHorizontal: 20}}>
        <FormField />
        <VerticalComponent half />
      </View>
    </SafeAreaView>
  );
};

export default FullExerciseScreen;

const styles = StyleSheet.create({});
