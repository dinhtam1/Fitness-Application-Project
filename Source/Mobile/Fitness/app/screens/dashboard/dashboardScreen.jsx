import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';

import TextComponent from '../../components/text/textComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiDashboard} from '../../apis/dashboard';

import CircleValue from './component/circleValue';

const DashboardScreen = () => {
  const [dashboard, setDashboard] = useState({});
  const {token} = useAuthStore();
  const {user} = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiDashboard(user.userId, token);
      if (response?.statusCode === 200) {
        setDashboard(response.data);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView>
      {/* <BackComponent title={'DASHBOARD'} nav={'Home'} /> */}
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 60,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 30,
          }}>
          <CircleValue
            data={dashboard.time_practice}
            unit={'Hours'}
            title={'Practice'}
          />
          <CircleValue
            data={dashboard.time_sleep}
            unit={'Hours'}
            title={'Sleep'}
          />
          <CircleValue data={dashboard.weight} unit={'Kg'} title={'Weight'} />
          <CircleValue
            data={dashboard.calories_burned}
            unit={'Kcal'}
            title={'Calories'}
          />
          <CircleValue data={dashboard.height} unit={'Cm'} title={'Height'} />
          <CircleValue data={dashboard.level} title={'Level'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
