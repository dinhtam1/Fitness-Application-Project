import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../constants/colors';
import {Ionicons} from '@expo/vector-icons';
import {fontFamilies} from '../../../constants/fontFamilies';
import * as Progress from 'react-native-progress';
import TextComponent from '../../../components/text/textComponent';
import {MaterialCommunityIcons} from '@expo/vector-icons'; //<MaterialCommunityIcons name="dumbbell" size={24} color="black" />
import {Feather} from '@expo/vector-icons'; //<Feather name="moon" size={24} color="black" />
import {FontAwesome6} from '@expo/vector-icons'; //<FontAwesome6 name="weight-scale" size={24} color="black" />
import {SimpleLineIcons} from '@expo/vector-icons'; //<SimpleLineIcons name="fire" size={24} color="black" />
import {MaterialIcons} from '@expo/vector-icons'; //<MaterialIcons name="height" size={24} color="black" />
import {AntDesign} from '@expo/vector-icons'; //<AntDesign name="dashboard" size={24} color="black" />

const CircleValue = ({data, unit, title, ...props}) => {
  const renderIcon = title => {
    switch (title) {
      case 'Practice':
        return (
          <MaterialCommunityIcons
            name="dumbbell"
            size={24}
            color="black"
            backgroundColor="white"
            style={{padding: 6}}
          />
        );
        break;
      case 'Sleep':
        return <Feather name="moon" size={24} color="black" />;
        break;
      case 'Weight':
        return <FontAwesome6 name="weight-scale" size={24} color="black" />;
        break;
      case 'Calories':
        return <SimpleLineIcons name="fire" size={24} color="black" />;
        break;
      case 'Height':
        return <MaterialIcons name="height" size={24} color="black" />;
        break;
      case 'Level':
        return <AntDesign name="dashboard" size={24} color="black" />;
        break;
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors['border-2'],
        width: 170,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 60}}>
        <View style={{borderRadius: 10, overflow: 'hidden', marginLeft: 10}}>
          {renderIcon(title)}
        </View>
        <TextComponent
          text={title}
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
          formatText={() => `item.value ${unit ? unit : ''}`}
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
  );
};

export default CircleValue;

const styles = StyleSheet.create({});
