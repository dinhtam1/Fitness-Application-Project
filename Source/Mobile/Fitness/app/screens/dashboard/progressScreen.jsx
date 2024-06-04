import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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
    name: 'Date',
  },
];

const ProgressScreen = () => {
  const [activeId, setActiveId] = useState(null);
  const [time, setTime] = useState('');

  const handlePress = (id, time) => {
    setTime(time.toLowerCase());
    setActiveId(id);
  };
  return (
    <SafeAreaView>
      <BackComponent black back title={'MY PROGRESS'} />
      <ScrollView>
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
              gap: 10,
              marginTop: 10,
            }}>
            {data.map((item, index) => (
              <View key={item.id}>
                <CustomButton
                  handlePress={() => handlePress(item.id, item.name)}
                  icon={
                    item.name === 'Date' ? (
                      <AntDesign
                        name="calendar"
                        size={22}
                        color={activeId === item.id ? 'white' : 'black'}
                      />
                    ) : null
                  }
                  title={item.name}
                  containerStyles={
                    activeId === item.id ? styles.button_active : styles.button
                  }
                  textStyles={[
                    activeId === item.id
                      ? styles.text_button_active
                      : styles.text_button,
                    {marginLeft: 5},
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  button: {
    width: 100,
    backgroundColor: colors['border-4'],
  },
  button_active: {
    width: 100,
    backgroundColor: colors['primary-color-black'],
  },
  text_button: {
    fontSize: 14,
    color: colors['text'],
    fontFamily: fontFamilies['medium'],
  },
  text_button_active: {
    fontSize: 14,
    fontFamily: fontFamilies['medium'],
  },
});
