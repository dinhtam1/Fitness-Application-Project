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

import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiDashboard} from '../../apis/dashboard';

import CircleValue from './component/circleValue';
import {getTimeToString} from '../../utils/helper';
import {common} from '../../styles/commonStyles';
import {text, title} from '../../constants/text';

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
    <SafeAreaView style={common.safeAreaView}>
      <BackComponent black back title={title['dashboard']} />
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 40,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 30,
        }}>
        <CircleValue
          data={getTimeToString(dashboard.time_practice)}
          unit={'Hours'}
          title={text['practice']}
        />
        <CircleValue
          data={getTimeToString(dashboard.time_sleep)}
          unit={'Hours'}
          title={text['sleep']}
        />
        <CircleValue
          data={dashboard.weight}
          unit={'Kg'}
          title={text['weight']}
        />
        <CircleValue
          data={dashboard.calories_burned}
          unit={'Kcal'}
          title={text['calories']}
        />
        <CircleValue
          data={dashboard.height}
          unit={'CM'}
          title={text['height']}
        />
        <CircleValue
          data={dashboard.exercise_complete}
          title={text['workout']}
          exercise
        />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
