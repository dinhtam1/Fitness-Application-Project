import {Dimensions, FlatList, Image, View} from 'react-native';
import React from 'react';
import {fontFamilies} from '../../constants/fontFamilies';
import CustomButton from '../button/buttonComponent';
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import TextComponent from '../text/textComponent';

const {width, height} = Dimensions.get('window');

const PaginationComponent = props => {
  const navigation = useNavigation();

  const {data, flatlistRef, handlePress, handleScroll, activeIndex} = props;
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image source={item.image} style={{height: height, width: width}} />
        <TextComponent
          text={item.title}
          color={colors['title']}
          size={24}
          font={fontFamilies['bold']}
          styles={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: 150,
            width: 240,
            textAlign: 'center',
          }}
        />
      </View>
    );
  };

  const renderDotIndicators = () => {
    return data.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            style={{
              backgroundColor: colors['primary-color'],
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: colors['primary-color-black'],
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}></View>
        );
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 30,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <CustomButton
          handlePress={() => navigation.navigate('SignIn')}
          title="SKIP"
          containerStyles={{backgroundColor: 'transparent'}}
          textStyles={{
            color: colors['title'],
            fontSize: 18,
            fontFamily: fontFamilies['semibold'],
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {renderDotIndicators()}
        </View>
        <CustomButton
          handlePress={handlePress}
          title="NEXT"
          containerStyles={{backgroundColor: 'transparent'}}
          textStyles={{
            color: colors['title'],
            fontSize: 18,
            fontFamily: fontFamilies['semibold'],
          }}
        />
      </View>
    </View>
  );
};

export default PaginationComponent;
