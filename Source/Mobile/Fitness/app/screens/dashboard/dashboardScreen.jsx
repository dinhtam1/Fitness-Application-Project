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

  console.log('dashboard', dashboard);
  return (
    <SafeAreaView>
      <BackComponent black back title={'DASHBOARD'} nav={'Main'} />
      <ScrollView>
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
            title={'Practice'}
          />
          <CircleValue
            data={getTimeToString(dashboard.time_sleep)}
            unit={'Hours'}
            title={'Sleep'}
          />
          <CircleValue data={dashboard.weight} unit={'Kg'} title={'Weight'} />
          <CircleValue
            data={dashboard.calories_burned}
            unit={'Kcal'}
            title={'Calories'}
          />
          <CircleValue data={dashboard.height} unit={'CM'} title={'Height'} />
          <CircleValue
            data={dashboard.exercise_complete}
            title={'Workout'}
            exercise
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
