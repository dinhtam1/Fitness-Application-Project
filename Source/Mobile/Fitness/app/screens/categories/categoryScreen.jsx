import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import FormField from '../../components/form/formFieldComponent';
import HorizontalComponent from '../../components/common/horizontalComponent';
import VerticalComponent from '../../components/common/verticalComponent';

const CategorySceen = () => {
  return (
    <SafeAreaView>
      <BackComponent title={'CATEGORIES'} />
      <View style={{paddingHorizontal: 20}}>
        <FormField
          placeholder={'Search'}
          icon={'search'}
          otherStyles={{marginTop: 0}}
        />
        <VerticalComponent />
      </View>
    </SafeAreaView>
  );
};

export default CategorySceen;
