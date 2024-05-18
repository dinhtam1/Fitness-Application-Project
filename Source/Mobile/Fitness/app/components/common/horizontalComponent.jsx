import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RowComponent from './rowComponent';
import TextComponent from '../text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import {banner1, splash2, exercise2} from '../../assets';
import {EvilIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const HorizontalComponent = ({
  title,
  image,
  data,
  widthImage,
  heightImage,
  radius,
  padleft,
  all,
  absolute,
  relative,
  nav,
  vertical,
  ...props
}) => {
  const scrollRef = useRef < ScrollView > null;
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRef = useRef([]);

  const navigation = useNavigation();

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
        {all ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(nav);
            }}>
            <TextComponent
              text={'See all'}
              font={fontFamilies['bold']}
              size={14}
              color={colors['primary-color-black']}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </RowComponent>
      <ScrollView
        horizontal={vertical ? false : true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15,
          paddingVertical: 10,
          marginBottom: 20,
        }}>
        {image
          ? data.map((item, index) => (
              <TouchableOpacity
                key={index}
                ref={el => (itemRef.current[index] = el)}
                onPress={() => handleSelectCategory(index)}>
                <Image
                  source={exercise2}
                  style={[
                    styles.image,
                    {
                      width: widthImage ?? 60,
                      height: heightImage ?? 60,
                      borderRadius: radius ?? 50,
                    },
                  ]}
                  resizeMode="contain"
                />
                <View
                // style={{
                //   position: absolute ? 'absolute' : '',
                //   bottom: 20,
                //   width: 100,
                // }}
                >
                  <TextComponent
                    size={14}
                    styles={[
                      activeIndex === index
                        ? styles.imageBtnTxtActive
                        : styles.imageBtnTxt,
                      {
                        marginTop: 10,
                      },
                    ]}
                    text={item.text}
                    font={fontFamilies['medium']}
                  />
                  {/* <RowComponent>
                    <EvilIcons
                      name="clock"
                      size={22}
                      color={colors['color-icon-1']}
                    />
                    <TextComponent unit={'min'} text={'20'} />
                  </RowComponent> */}
                </View>
              </TouchableOpacity>
            ))
          : data.map((item, index) => (
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

export default HorizontalComponent;

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
  image: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBtnTxt: {
    color: colors['primary-color-black'],
    // textAlign: 'center',
    marginTop: 10,
  },
  imageBtnTxtActive: {
    color: colors['primary-color-black'],
    // textAlign: 'center',
    marginTop: 10,
  },
});
