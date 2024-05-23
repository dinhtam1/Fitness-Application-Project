import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RowComponent from '../../../components/common/rowComponent';
import TextComponent from '../../../components/text/textComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';

const dataGoal1 = [
  {
    id: 1,
    text: 'Loose Weight',
  },
  {
    id: 2,
    text: 'Gain Weight',
  },
  {
    id: 3,
    text: 'Build Muscle',
  },
  {
    id: 4,
    text: 'Stay Fit',
  },
  {
    id: 5,
    text: 'Stay Healthy',
  },
  {
    id: 6,
    text: 'Body Building',
  },
];

const Goal = ({title, ...props}) => {
  const scrollRef = useRef < ScrollView > null;
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRef = useRef([]);
  const handleSelectCategory = index => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure(x => {
      scrollRef.current?.scrollTo({x: x, y: 0, animated: true});
    });
  };
  return (
    <View>
      <RowComponent justify={'space-between'}>
        <TextComponent
          text={title}
          size={22}
          font={fontFamilies['bebasNeue']}
          color={colors['primary-color-black']}
          styles={{marginBottom: 10, marginTop: 20}}
        />
      </RowComponent>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15,
          paddingVertical: 10,
          marginBottom: 20,
        }}>
        {dataGoal1.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={el => (itemRef.current[index] = el)}
            onPress={() => handleSelectCategory(index)}
            style={
              activeIndex === index
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }>
            <TextComponent
              size={14}
              styles={
                activeIndex === index
                  ? styles.categoryBtnTxtActive
                  : styles.categoryBtnTxt
              }
              text={item.text}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['primary-color-light'],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  categoryBtnActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['primary-color-black'],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    marginLeft: 5,
    color: colors['primary-color-black'],
  },
  categoryBtnTxtActive: {
    marginLeft: 5,
    color: colors['text-white'],
  },
});
