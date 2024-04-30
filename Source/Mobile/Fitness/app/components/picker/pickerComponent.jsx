import {Dimensions, StyleSheet, Text, View} from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

import React, {useState} from 'react';
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
const PickerComponent = ({onValueChange}) => {
  const [index, setIndex] = useState(0);
  const handleValueChange = (data, selectedIndex) => {
    setIndex(selectedIndex);
    onValueChange(data);
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
        onValueChange={handleValueChange}
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
