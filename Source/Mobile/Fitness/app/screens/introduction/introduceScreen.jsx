import {Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {splash2, splash3, splash4} from '../../assets';
import {title} from '../../constants/text';
import {useNavigation} from '@react-navigation/native';
import PaginationComponent from '../../components/common/carouselComponent';

const {width, height} = Dimensions.get('window');

const IntroduceScreen = () => {
  const navigation = useNavigation();
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselData = [
    {
      id: '01',
      image: splash2,
      title: title['splash2'],
    },
    {
      id: '02',
      image: splash3,
      title: title['splash3'],
    },
    {
      id: '03',
      image: splash4,
      title: title['splash4'],
    },
  ];

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    const index = scrollPosition / width;

    if (scrollPosition > 2.2 * width) {
      navigation.navigate('SignIn');
    }

    setActiveIndex(index);
  };

  const handlePress = () => {
    let nextIndex = activeIndex + 1;
    if (activeIndex === 2) {
      navigation.navigate('SignIn');
    } else {
      flatlistRef.current.scrollToIndex({index: nextIndex, animated: true});
      setActiveIndex(nextIndex);
    }
  };

  return (
    <>
      <PaginationComponent
        data={carouselData}
        flatlistRef={flatlistRef}
        handlePress={handlePress}
        handleScroll={handleScroll}
        activeIndex={activeIndex}
      />
    </>
  );
};

export default IntroduceScreen;
