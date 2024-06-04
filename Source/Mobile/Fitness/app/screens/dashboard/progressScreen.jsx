import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import CustomButton from '../../components/button/buttonComponent';
import {AntDesign} from '@expo/vector-icons';

const data = [
  {
    id: 1,
    name: 'Week',
  },
  {
    id: 2,
    name: 'Month',
  },
  {
    id: 3,
    name: <AntDesign name="calendar" size={24} color="black" /> + 'Date',
  },
];

const ProgressScreen = () => {
  return (
    <SafeAreaView>
      <BackComponent black back title={'MY PROGRESS'} />
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <TextComponent
          text={'Activity'}
          size={18}
          font={fontFamilies['bold']}
          color={colors['title']}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 20,
            marginTop: 10,
          }}>
          {data.map((item, index) => (
            <View key={item.id}>
              <CustomButton
                handlePress={() => handlePress(item.id, item.name)}
                title={item.name}
                containerStyles={
                  activeId === item.id ? styles.button_active : styles.button
                }
                textStyles={
                  activeId === item.id
                    ? styles.text_button_active
                    : styles.text_button
                }
              />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  button: {
    width: 110,
    backgroundColor: colors['border-4'],
  },
  button_active: {
    width: 110,
  },
  text_button: {
    fontSize: 14,
    color: colors['text'],
  },
  text_button_active: {
    fontSize: 14,
  },
});
