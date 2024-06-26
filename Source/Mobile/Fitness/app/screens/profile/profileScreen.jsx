import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackComponent from '../../components/header/backComponent';
import {meal1, meal2, carbs, protein, fat} from '../../assets';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {useUserStore} from '../../store/useAuthStore';
import {colors} from '../../constants/colors';
import {FontAwesome} from '@expo/vector-icons';
import {text, title} from '../../constants/text';

const ProfileScreen = () => {
  const {user} = useUserStore();
  return (
    <SafeAreaView
      style={{backgroundColor: colors['background-white'], height: '100%'}}>
      <BackComponent title={title['profile']} edit />
      <View style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          {user?.avatar_url ? (
            <Image
              src={user?.avatar_url}
              resizeMethod="contain"
              style={styles.image}
            />
          ) : (
            <FontAwesome name="user-circle-o" size={120} color="black" />
          )}
          <TextComponent
            text={user?.full_name}
            size={20}
            font={fontFamilies['semibold']}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 60,
            gap: 60,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <TextComponent
              text={user?.weight}
              unit={'kg'}
              size={17}
              styles={{marginBottom: 5}}
            />
            <TextComponent text={text['weight']} size={14} />
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <TextComponent
              text={user?.height}
              unit={'cm'}
              size={17}
              styles={{marginBottom: 5}}
            />
            <TextComponent text={text['height']} size={14} />
          </View>
          <View style={{alignItems: 'center'}}>
            <TextComponent
              text={user?.age}
              unit={'years'}
              size={17}
              styles={{marginBottom: 5}}
            />
            <TextComponent text={text['age']} size={14} />
          </View>
        </View>
        <View style={{marginTop: 60}}>
          <TextComponent
            text={'MICRONUTRIENT GOALS'}
            size={26}
            font={fontFamilies['bebasNeue']}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 30,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={protein}
                resizeMode="cover"
                style={styles.image2}
              />
              <TextComponent
                text={text['protein']}
                size={15}
                font={fontFamilies['semibold']}
              />
              <TextComponent
                text={'100g'}
                size={13}
                font={fontFamilies['medium']}
              />
              <TextComponent text={text['grams-per-day']} size={14} />
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={carbs} resizeMode="cover" style={styles.image2} />
              <TextComponent
                text={text['carbs']}
                size={15}
                font={fontFamilies['semibold']}
              />
              <TextComponent
                text={'100g'}
                size={13}
                font={fontFamilies['medium']}
              />
              <TextComponent text={text['grams-per-day']} size={14} />
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={fat} resizeMode="cover" style={styles.image2} />
              <TextComponent
                text={text['fat']}
                size={15}
                font={fontFamilies['semibold']}
              />
              <TextComponent
                text={'100g'}
                size={13}
                font={fontFamilies['medium']}
              />
              <TextComponent text={text['grams-per-day']} size={14} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 10,
  },
  image2: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
});
