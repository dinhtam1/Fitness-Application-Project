import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {fontFamilies} from '../../constants/fontFamilies';
import CustomButton from '../button/buttonComponent';
import {colors} from '../../constants/colors';
import TextComponent from '../text/textComponent';
import {useAuthStore} from '../../store/useAuthStore';
import {button} from '../../constants/text';

const {width, height} = Dimensions.get('window');

const PaginationComponent = props => {
  const {setIsShowSplash} = useAuthStore();

  const {data, flatlistRef, handlePress, handleScroll, activeIndex} = props;
  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <Image source={item.image} style={{height: height, width: width}} />
        <TextComponent
          text={item.title}
          color={colors['title']}
          size={24}
          font={fontFamilies['bold']}
          styles={styles.item_text}
        />
      </View>
    );
  };

  const renderDotIndicators = () => {
    return data.map((dot, index) => {
      if (activeIndex === index) {
        return <View key={index} style={styles.dot_active}></View>;
      } else {
        return <View key={index} style={styles.dot}></View>;
      }
    });
  };
  return (
    <View>
      <FlatList
        data={data}
        ref={flatlistRef}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.container}>
        <CustomButton
          handlePress={() => setIsShowSplash(false)}
          title={button['skip']}
          containerStyles={styles.container_button}
          textStyles={styles.text_button}
        />
        <View style={styles.container_dot}>{renderDotIndicators()}</View>
        <CustomButton
          handlePress={handlePress}
          title={button['next']}
          containerStyles={styles.container_button}
          textStyles={styles.text_button}
        />
      </View>
    </View>
  );
};

export default PaginationComponent;

const styles = StyleSheet.create({
  item_text: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 150,
    width: 240,
    textAlign: 'center',
  },
  container_dot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot_active: {
    backgroundColor: colors['primary-color'],
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dot: {
    backgroundColor: colors['primary-color-black'],
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
  container_button: {backgroundColor: 'transparent'},
  text_button: {
    color: colors['title'],
    fontSize: 18,
    fontFamily: fontFamilies['semibold'],
  },
});
