import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

import React, {useRef, useState} from 'react';
import TextComponent from '../text/textComponent';
import {colors} from '../../constants/colors';

const {width, height} = Dimensions.get('window');

const start = 10;

const dataSource = new Array(60)
  .fill(0)
  .reverse()
  .map((_, i) => {
    const value = start + i;
    return value.toString();
  });
const PickerComponent = () => {
  const ref = useRef();
  const [index, setIndex] = useState(0);
  const onValueChange = (data, selectedIndex) => {
    setIndex(selectedIndex);
  };

  const onNext = () => {
    if (index === dataSource.length - 1) return;
    setIndex(index + 1);
    ref.current && ref.current.scrollToTargetIndex(index + 1);
  };
  return (
    <View style={styles.container}>
      <ScrollPicker
        dataSource={dataSource}
        selectedIndex={index}
        renderItem={(data, index) => {
          return (
            <View
              style={{
                width: width || 80,
                padding: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: colors['text'],
                }}>
                {data}
              </Text>
            </View>
          );
        }}
        onValueChange={onValueChange}
        wrapperHeight={200}
        itemHeight={40}
        highlightColor="#000"
        highlightBorderWidth={2.5}
        wrapperBackground="transparent"
      />
    </View>
  );
};

export default PickerComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 100,
  },
});
