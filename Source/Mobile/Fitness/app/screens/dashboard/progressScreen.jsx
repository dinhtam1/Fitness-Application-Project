import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import TextComponent from '../../components/text/textComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import CustomButton from '../../components/button/buttonComponent';
import {AntDesign} from '@expo/vector-icons';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {apiDashboard, apiStatistic} from '../../apis/dashboard';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import moment from 'moment';
import CircleValue from './component/circleValue';
import {getTimeToString} from '../../utils/helper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {text, title} from '../../constants/text';

const data = [
  {
    id: 1,
    name: 'Week',
  },
  {
    id: 2,
    name: 'Month',
  },
  {
    id: 3,
    name: 'Date',
  },
];

const ProgressScreen = () => {
  const [activeId, setActiveId] = useState(1);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const [statistic, setStatistic] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const today = moment().format('dddd').slice(0, 3);

  const showDatePicker = id => {
    setDatePickerVisibility(true);
    setActiveId(id);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  const handlePress = (id, time) => {
    setTime(time.toLocaleLowerCase());
    setActiveId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiStatistic(user.userId, token, {
        period: time,
        start: date,
        end: date,
      });
      const dashboard = await apiDashboard(user.userId, token, {
        period: time,
        start: date,
        end: date,
      });
      if (response.statusCode === 200 && dashboard.statusCode === 200) {
        setDashboard(dashboard.data);
        setStatistic(response.data);
      }
    };
    fetchData();
  }, [time, date]);

  const barData = statistic.map(item => {
    return {
      value: item.calories_loaded,
      label: time === 'month' ? moment(item.date).format('DD') : item.date,
      frontColor: today === item.date ? '#177AD5' : 'lightgray',
    };
  });
  return (
    <SafeAreaView>
      <BackComponent black back title={title['my-progress']} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <TextComponent
            text={'Activity'}
            size={18}
            font={fontFamilies['bold']}
            color={colors['title']}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
              marginTop: 10,
            }}>
            {data.map((item, index) => (
              <View key={item.id}>
                <CustomButton
                  handlePress={() =>
                    item.name === 'Date'
                      ? showDatePicker(item.id)
                      : handlePress(item.id, item.name)
                  }
                  icon={
                    item.name === 'Date' ? (
                      <AntDesign
                        name="calendar"
                        size={22}
                        color={activeId === item.id ? 'white' : 'black'}
                      />
                    ) : null
                  }
                  title={item.name}
                  containerStyles={
                    activeId === item.id ? styles.button_active : styles.button
                  }
                  textStyles={[
                    activeId === item.id
                      ? styles.text_button_active
                      : styles.text_button,
                    {marginLeft: 5},
                  ]}
                />
              </View>
            ))}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={{marginTop: 40}}>
            <BarChart
              isAnimated={true}
              barWidth={22}
              barBorderRadius={4}
              data={barData}
              yAxisThickness={0}
              xAxisThickness={0}
            />
          </View>
          <View style={{marginTop: 40}}>
            <TextComponent
              text={'Measurement'}
              size={18}
              font={fontFamilies['semibold']}
            />
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 30,
                marginBottom: 40,
              }}>
              <CircleValue
                data={getTimeToString(dashboard?.time_practice)}
                unit={'Hours'}
                title={text['practice']}
              />
              <CircleValue
                data={getTimeToString(dashboard?.time_sleep)}
                unit={'Hours'}
                title={text['sleep']}
              />
              <CircleValue
                data={dashboard?.calories_burned}
                unit={'Kcal'}
                title={text['calories']}
              />
              <CircleValue
                data={dashboard?.exercise_complete}
                title={text['workout']}
                exercise
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  button: {
    width: 100,
    backgroundColor: colors['border-4'],
  },
  button_active: {
    width: 100,
    backgroundColor: colors['primary-color-black'],
  },
  text_button: {
    fontSize: 14,
    color: colors['text'],
    fontFamily: fontFamilies['medium'],
  },
  text_button_active: {
    fontSize: 14,
    fontFamily: fontFamilies['medium'],
  },
});
