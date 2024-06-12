import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import TextComponent from '../../../components/text/textComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  exercise1,
  exercise2,
  exercise3,
  exercise4,
  meal1,
  meal2,
} from '../../../assets';
import RowComponent from '../../../components/common/rowComponent';
import {EvilIcons} from '@expo/vector-icons';
import {SimpleLineIcons} from '@expo/vector-icons';

const dataGoal = [
  {
    id: 1,
    text: 'Full Shot Man Stretching Arm',
    level: 'Beginner',
    minutes: '30',
    image: exercise1,
  },
  {
    id: 2,
    text: 'Athlete Practicing Monochrome',
    level: 'Beginner',
    minutes: '30',
    image: exercise2,
  },
];

const dataMeal = [
  {
    id: 1,
    text: 'Greek salad with lettuce, green onion',
    calo: 150,
    image: meal1,
  },
  {
    id: 2,
    text: 'Greek salad with lettuce, green onion',
    calo: 150,
    image: meal2,
  },
];

const CategoryVertical = ({title, meal, unit, full, ...props}) => {
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

  const renderFullImage = data => {
    return data.map((item, index) => (
      <TouchableOpacity
        key={index}
        ref={el => (itemRef.current[index] = el)}
        onPress={() => handleSelectCategory(index)}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            width: 340,
            height: 180,
            borderRadius: 10,
          }}
        />
        <TextComponent
          size={14}
          text={item.text}
          font={fontFamilies['semibold']}
          styles={{marginVertical: 10}}
        />
        <View style={{flexDirection: 'row'}}>
          {meal ? (
            <></>
          ) : (
            <>
              <TextComponent
                text={item.level}
                font={fontFamilies['regular']}
                size={14}
              />
            </>
          )}
          <View style={{flexDirection: 'row'}}>
            {meal ? (
              <></>
            ) : (
              <>
                <TextComponent
                  text={'|'}
                  font={fontFamilies['regular']}
                  size={14}
                  styles={{marginHorizontal: 10}}
                />
                <EvilIcons
                  name="clock"
                  size={24}
                  color={colors['color-icon-1']}
                />
              </>
            )}
            <TextComponent
              text={item.minutes}
              font={fontFamilies['regular']}
              size={14}
              unit={unit}
            />
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderHaflImage = data => {
    return data.map((item, index) => (
      <TouchableOpacity
        key={index}
        ref={el => (itemRef.current[index] = el)}
        onPress={() => handleSelectCategory(index)}>
        <RowComponent justify="flex-start" gap={30}>
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              width: 120,
              height: 120,
              borderRadius: 10,
            }}
          />
          <View style={{width: 200, minHeight: 120}}>
            <TextComponent
              text={item.text}
              size={16}
              font={fontFamilies['semibold']}
              color={colors['text-2']}
            />
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <SimpleLineIcons
                name="fire"
                size={18}
                color={colors['color-icon-1']}
                style={{marginRight: 5}}
              />
              <TextComponent
                text={'135'}
                font={fontFamilies['regular']}
                size={14}
                unit={'kcal'}
              />
              <TextComponent
                text={'|'}
                font={fontFamilies['regular']}
                size={14}
                styles={{marginHorizontal: 10}}
              />
              <EvilIcons
                name="clock"
                size={24}
                color={colors['color-icon-1']}
              />
              <TextComponent
                text={item.minutes}
                font={fontFamilies['regular']}
                size={14}
                unit={unit}
              />
            </View>
            <TextComponent
              text={item.level}
              font={fontFamilies['regular']}
              size={14}
            />
          </View>
        </RowComponent>
      </TouchableOpacity>
    ));
  };
  return (
    <View style={{borderTopWidth: 1, borderTopColor: colors['border']}}>
      <RowComponent justify={'space-between'}>
        <TextComponent
          text={title}
          size={22}
          font={fontFamilies['bebasNeue']}
          color={colors['primary-color-black']}
          styles={{marginBottom: 10, marginTop: 20}}
        />

        <TouchableOpacity>
          <TextComponent
            text={'See all'}
            font={fontFamilies['bold']}
            size={14}
            color={colors['primary-color-black']}
          />
        </TouchableOpacity>
      </RowComponent>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15,
          paddingVertical: 10,
          marginBottom: 10,
        }}>
        {full
          ? meal
            ? renderFullImage(dataMeal)
            : renderFullImage(dataGoal)
          : renderHaflImage(dataMeal)}
      </ScrollView>
    </View>
  );
};

export default CategoryVertical;