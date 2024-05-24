import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/button/buttonComponent';
import BackComponent from '../../components/header/backComponent';
import {exercise1} from '../../assets';
import {Controller, useForm} from 'react-hook-form';
import FormField from '../../components/form/formFieldComponent';
import {placeholder, titleForm} from '../../constants/text';
import {Feather} from '@expo/vector-icons';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';

const data = [
  {id: 1, value: 'Beginner'},
  {id: 2, value: 'Intermediate'},
  {id: 3, value: 'Advanced'},
];

const dataGender = [
  {id: 1, value: 'male'},
  {id: 2, value: 'female'},
];

const dataGoal = [
  {id: 1, value: 'WEIGHT LOSS'},
  {id: 2, value: 'GAIN MUSCLE'},
];

const EditProfileScreen = () => {
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm();
  const [isFocus, setIsFocus] = useState(false);

  const onSubmit = async data => {};
  return (
    <SafeAreaView>
      <BackComponent title={'EDIT PROFILE'} nav={'Home'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 20, marginTop: 20, marginBottom: 40}}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={exercise1} resizeMode="cover" style={styles.image} />
          <Feather name="camera" size={40} color="white" style={styles.icon} />
        </TouchableOpacity>
        <View style={{paddingVertical: 20}}>
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <FormField
                placeholder={placeholder['name']}
                title={'Full Name'}
                handleChangeText={onChange}
                value={value}
                error={errors[name]?.message}
              />
            )}
            name="full_name"
          />
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <FormField
                placeholder={placeholder['phone']}
                title={'Phone'}
                handleChangeText={onChange}
                keyboardType="number-pad"
                value={value}
                error={errors[name]?.message}
              />
            )}
            name="phone_number"
          />
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <>
                <TextComponent
                  text={'Fitness Level'}
                  size={16}
                  styles={{marginVertical: 10}}
                />
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={200}
                    labelField="value"
                    valueField="value"
                    placeholder={user.level}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => onChange(item.value)}
                  />
                </View>
              </>
            )}
            name="level"
          />
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <>
                <TextComponent
                  text={'Fitness Goal'}
                  size={16}
                  styles={{marginVertical: 10}}
                />
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={dataGoal}
                    maxHeight={200}
                    labelField="value"
                    valueField="value"
                    placeholder={user.goal}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => onChange(item.value)}
                  />
                </View>
              </>
            )}
            name="goal"
          />
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <FormField
                placeholder={placeholder['weight']}
                title={'Weight (kg)'}
                handleChangeText={onChange}
                keyboardType="number-pad"
                value={value}
                error={errors[name]?.message}
              />
            )}
            name="weight"
          />
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <FormField
                placeholder={placeholder['height']}
                title={'Height (cm)'}
                handleChangeText={onChange}
                keyboardType="number-pad"
                value={value}
                error={errors[name]?.message}
              />
            )}
            name="height"
          />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'This field cannot empty'},
            }}
            render={({field: {onChange, value, name}}) => (
              <>
                <TextComponent
                  text={'Gender'}
                  size={16}
                  styles={{marginVertical: 10}}
                />
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={dataGender}
                    maxHeight={200}
                    labelField="value"
                    valueField="value"
                    placeholder={user.gender}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => onChange(item.value)}
                  />
                </View>
              </>
            )}
            name="gender"
          />
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <FormField
                placeholder={placeholder['age']}
                title={'Age'}
                handleChangeText={onChange}
                keyboardType="number-pad"
                value={value}
                error={errors[name]?.message}
              />
            )}
            name="age"
          />
        </View>
        <CustomButton
          handlePress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          title={'SAVE'}
          containerStyles={{marginVertical: 30}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  icon: {
    position: 'absolute',
    bottom: 40,
    right: 170,
  },
  container: {
    backgroundColor: 'transparent',
  },
  dropdown: {
    height: 64,
    borderColor: 'gray',
    borderWidth: 2,
    borderColor: 'rgba(105, 105, 105, 0.25)',
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
