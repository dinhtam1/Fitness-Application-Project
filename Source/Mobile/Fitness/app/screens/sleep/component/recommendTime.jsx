import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AnalogClock from 'react-native-clock-analog';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';

const RecommendTime = ({index, hour, minute, onButtonPress}) => {
  console.log(index);
  const [isOn, setIsOn] = useState(false);
  const onColor = colors['primary-color'];
  const offColor = colors['toggle'];

  return (
    <View style={{padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <AnalogClock
          key={index}
          size={100}
          hour={hour}
          minutes={minute}
          colorHour="#000"
          colorMinutes="#000"
        />
        <View style={{alignItems: 'center'}}>
          <TextComponent
            text={`${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`}
            font={fontFamilies['medium']}
            size={50}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            let newIsOn = !isOn;
            setIsOn(newIsOn);
            if (onButtonPress) {
              onButtonPress(hour, minute, newIsOn);
            }
          }}
          style={{
            height: 30,
            width: 60,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: isOn ? onColor : offColor,
            backgroundColor: isOn ? onColor : offColor,
          }}>
          <View
            style={{
              height: '100%',
              width: '50%',
              backgroundColor: 'white',
              borderRadius: 100,
              alignSelf: isOn ? 'flex-end' : 'flex-start',
            }}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecommendTime;
