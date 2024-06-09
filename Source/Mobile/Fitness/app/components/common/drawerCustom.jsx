import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import TextComponent from '../text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {FontAwesome6} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiLogout} from '../../apis';

const data = [
  {
    id: 1,
    name: 'Dashboard',
    nav: 'Dashboard',
  },
  {
    id: 2,
    name: 'My Progress',
    nav: 'Progress',
  },
  {
    id: 3,
    name: 'Training',
    nav: 'Training',
  },
  {
    id: 4,
    name: 'Categories',
    nav: 'Category',
  },
  {
    id: 5,
    name: 'Sleep',
    nav: 'Sleep',
  },
  {
    id: 6,
    name: 'Notification',
    nav: 'Notification',
  },
  {
    id: 7,
    name: 'Settings',
    nav: 'Setting',
  },
];

const renderIcon = name => {
  switch (name) {
    case 'Dashboard':
      return <AntDesign name="dashboard" size={20} color="black" />;
      break;
    case 'Training':
      return <FontAwesome6 name="dumbbell" size={18} color="black" />;
      break;
    case 'My Progress':
      return <MaterialIcons name="sports-gymnastics" size={22} color="black" />;
      break;
    case 'Categories':
      return <MaterialIcons name="category" size={24} color="black" />;
      break;
    case 'Sleep':
      return <MaterialCommunityIcons name="sleep" size={24} color="black" />;
      break;
    case 'Notification':
      return (
        <MaterialIcons name="notifications-none" size={24} color="black" />
      );
      break;
    case 'Settings':
      return <AntDesign name="setting" size={24} color="black" />;
      break;
  }
};

const DrawerCustom = () => {
  const navigation = useNavigation();
  const {token, setToken, setIsLogin, isLogin} = useAuthStore();
  const {user, setUser} = useUserStore();

  const handleLogOut = async () => {
    const response = await apiLogout(user.userId, token);
    if (response.statusCode === 200) {
      setUser(null);
      setToken('');
      setIsLogin(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate('Home')}>
          <AntDesign name="close" size={30} color="black" />
        </TouchableOpacity>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {user?.avatar_url ? (
              <Image
                src={user?.avatar_url}
                resizeMode="cover"
                style={styles.image}
              />
            ) : (
              <FontAwesome name="user-circle-o" size={130} color="black" />
            )}
          </TouchableOpacity>
          <TextComponent
            text={user?.full_name}
            size={19}
            font={fontFamilies['semibold']}
            styles={{marginTop: 10}}
          />
        </View>
        <View style={{marginTop: 20}}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.nav)}
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingVertical: 15,
                borderColor: colors['border-3'],
              }}>
              {renderIcon(item.name)}
              <TextComponent
                text={item.name}
                size={17}
                font={fontFamilies['medium']}
                styles={{marginLeft: 10}}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleLogOut}
          style={{
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
          }}>
          <AntDesign name="logout" size={24} color="black" />
          <TextComponent
            text={'Sign Out'}
            size={18}
            font={fontFamilies['medium']}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DrawerCustom;

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
});
