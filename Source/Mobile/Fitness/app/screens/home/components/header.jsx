import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from '../../../components/common/rowComponent';
import {Feather} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {useUserStore} from '../../../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const user = useUserStore(state => state.user);
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: 'white',
        }}>
        <RowComponent
          justify={'space-between'}
          styles={{
            width: '100%',
            paddingVertical: 10,
            marginTop: 40,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                src={user?.avatar_url}
                resizeMode="cover"
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <MaterialIcons name="notifications-none" size={26} color="black" />
          </TouchableOpacity>
        </RowComponent>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
