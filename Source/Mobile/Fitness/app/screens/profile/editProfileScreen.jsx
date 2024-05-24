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
import BackComponent from '../../components/header/backComponent';
import {exercise1} from '../../assets';
import {Controller, useForm} from 'react-hook-form';
import FormField from '../../components/form/formFieldComponent';
import {placeholder, titleForm} from '../../constants/text';
import {Feather} from '@expo/vector-icons';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';

const data = [
  {id: 1, value: 'Beginner'},
  {id: 2, value: 'Intermediate'},
  {id: 3, value: 'Advanced'},
];

const EditProfileScreen = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <SafeAreaView>
      <BackComponent title={'EDIT PROFILE'} nav={'Home'} />
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={exercise1} resizeMode="cover" style={styles.image} />
            <Feather
              name="camera"
              size={40}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={{paddingVertical: 20}}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['email']}
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
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['password']}
                  title={'Phone'}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="phone"
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <>
                  <TextComponent text={'Fitness Level'} size={16} />
                  <View style={styles.container}>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && {borderColor: colors['primary-color-black']},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      data={data}
                      maxHeight={200}
                      labelField="value"
                      valueField="value"
                      placeholder={'Beginner'}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </>
              )}
              name="level"
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['password']}
                  title={titleForm['password']}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="goal"
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['password']}
                  title={'Weight (kg)'}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="weight"
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
                // minLength: {
                //   value: 8,
                //   message: 'Password must be at least 8 characters',
                // },
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['password']}
                  title={'Height (cm)'}
                  handleChangeText={onChange}
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
                <FormField
                  placeholder={placeholder['password']}
                  title={'Height (cm)'}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="gender"
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty'},
              }}
              render={({field: {onChange, value, name}}) => (
                <FormField
                  placeholder={placeholder['password']}
                  title={'Height (cm)'}
                  handleChangeText={onChange}
                  value={value}
                  error={errors[name]?.message}
                />
              )}
              name="age"
            />
          </View>
        </ScrollView>
      </View>
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
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
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
