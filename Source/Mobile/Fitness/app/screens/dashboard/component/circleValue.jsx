import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../constants/colors';
import {Ionicons} from '@expo/vector-icons';
import {fontFamilies} from '../../../constants/fontFamilies';
import * as Progress from 'react-native-progress';
import TextComponent from '../../../components/text/textComponent';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {FontAwesome6} from '@expo/vector-icons';
import {SimpleLineIcons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {yoga} from '../../../assets';

const CircleValue = ({data, unit, title, exercise, ...props}) => {
  const renderIcon = title => {
    switch (title) {
      case 'Practice':
        return (
          <MaterialCommunityIcons
            name="dumbbell"
            size={22}
            color="black"
            style={{padding: 6}}
          />
        );
        break;
      case 'Sleep':
        return <Feather name="moon" size={22} color="black" />;
        break;
      case 'Weight':
        return <FontAwesome6 name="weight-scale" size={22} color="black" />;
        break;
      case 'Calories':
        return <SimpleLineIcons name="fire" size={22} color="black" />;
        break;
      case 'Height':
        return <MaterialIcons name="height" size={22} color="black" />;
        break;
      case 'Workout':
        return (
          <MaterialIcons name="sports-gymnastics" size={22} color="black" />
        );
        break;
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors['border-2'],
        width: 160,
        borderRadius: 10,
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 60,
          marginTop: 10,
        }}>
        <View style={{borderRadius: 10, overflow: 'hidden', marginLeft: 10}}>
          {renderIcon(title)}
        </View>
        <TextComponent
          text={title}
          size={14}
          font={fontFamilies['semibold']}
          styles={{marginRight: 10}}
        />
      </View>
      <View style={{marginVertical: 10}}>
        {exercise ? (
          <View style={{alignItems: 'center'}}>
            <Image source={yoga} resizeMode="cover" />
            <TextComponent
              text={data}
              size={16}
              font={fontFamilies['semibold']}
            />
            <TextComponent
              text={'Exercise'}
              size={15}
              font={fontFamilies['medium']}
            />
          </View>
        ) : (
          <Progress.Circle
            size={120}
            indeterminate={false}
            progress={1}
            showsText={true}
            borderColor="transparent"
            color={colors['primary-color']}
            thickness={12}
            unfilledColor={colors['border-3']}
            formatText={() => (
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <TextComponent
                  text={data}
                  size={16}
                  font={fontFamilies['semibold']}
                />
                <TextComponent text={unit} font={fontFamilies['medium']} />
              </View>
            )}
            strokeCap="round"
            textStyle={{
              color: colors['text-2'],
              fontWeight: fontFamilies['semibold'],
              fontSize: 15,
            }}
            animated={true}
          />
        )}
      </View>
    </View>
  );
};

export default CircleValue;
