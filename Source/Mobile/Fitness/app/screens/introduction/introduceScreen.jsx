import {Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {splash2, splash3, splash4} from '../../assets';
import {title} from '../../constants/text';
import PaginationComponent from '../../components/common/carouselComponent';
import {useAuthStore} from '../../store/useAuthStore';

const {width, height} = Dimensions.get('window');

const IntroduceScreen = () => {
  const {setIsShowSplash} = useAuthStore();
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselData = [
    {
      id: '1',
      image: splash2,
      title: title['splash2'],
    },
    {
      id: '2',
      image: splash3,
      title: title['splash3'],
    },
    {
      id: '3',
      image: splash4,
      title: title['splash4'],
    },
  ];

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    const index = scrollPosition / width;

    if (scrollPosition > 2.2 * width) {
      setIsShowSplash(false);
    }

    setActiveIndex(index);
  };

  const handlePress = () => {
    let nextIndex = activeIndex + 1;
    if (activeIndex === 2) {
      setIsShowSplash(false);
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
