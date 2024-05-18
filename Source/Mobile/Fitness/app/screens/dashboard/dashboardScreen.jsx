import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import {Ionicons} from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import heart from '../../assets';

const data = [
  {
    text: 'Walk',
    value: '2265 Steps',
  },
  {
    text: 'Sleep',
    value: '8:50 Hours',
  },
  {
    text: 'Heart',
    value: '72 BPM',
  },
  {
    text: 'Calories',
    value: '2000 Kcal',
  },
];

const DashboardScreen = () => {
  return (
    <SafeAreaView>
      <BackComponent title={'DASHBOAD'} />
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 60,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 30,
        }}>
        {data.map((item, index) => (
          <View
            style={{
              backgroundColor: colors['border-2'],
              width: 170,
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 60}}>
              <View
                style={{borderRadius: 10, overflow: 'hidden', marginLeft: 10}}>
                <Ionicons
                  name="footsteps-outline"
                  size={24}
                  color="black"
                  backgroundColor="white"
                  style={{padding: 6}}
                />
              </View>
              <TextComponent
                text={item.text}
                size={17}
                font={fontFamilies['semibold']}
                styles={{marginRight: 10}}
              />
            </View>
            <View style={{marginVertical: 10}}>
              <Progress.Circle
                size={120}
                indeterminate={false}
                progress={0.3}
                showsText={true}
                borderColor="transparent"
                color={colors['primary-color']}
                thickness={12}
                unfilledColor={colors['border-3']}
                formatText={() => item.value}
                strokeCap="round"
                textStyle={{
                  color: colors['text-2'],
                  fontWeight: fontFamilies['semibold'],
                  fontSize: 15,
                  width: 50,
                }}
                animated={true}
              />
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
