import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/button/buttonComponent';
import BackComponent from '../../components/header/backComponent';
import {Controller, useForm} from 'react-hook-form';
import FormField from '../../components/form/formFieldComponent';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constants/colors';
import TextComponent from '../../components/text/textComponent';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiUpdateProfile} from '../../apis';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome} from '@expo/vector-icons';

const data = [
  {id: 1, value: 'BEGINNER'},
  {id: 2, value: 'INTERMEDIATE'},
  {id: 3, value: 'ADVANCED'},
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
  const navigation = useNavigation();
  const {user, setUser} = useUserStore();
  const {token} = useAuthStore();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm();
  const [isFocus, setIsFocus] = useState(false);

  const onSubmit = async data => {
    for (let key in data) {
      if (data[key] === undefined) {
        data[key] = user[key];
      }
    }
    const response = await apiUpdateProfile(data, user.userId, token);
    if (response.statusCode === 200) {
      setUser(response.data);
      if (image) {
        const formData = new FormData();
        formData.append('avatar', {
          type: `image/jpeg`,
          name: `photo.jpg`,
          uri: image,
        });
        const responseImage = await apiUpdateProfile(
          formData,
          user.userId,
          token,
        );
        setUser(responseImage.data);
        if (responseImage.statusCode === 200) {
          Toast.show(
            toastConfig({
              type: 'success',
              textMain: responseImage.message,
              visibilityTime: 2000,
            }),
          );
        }
      }
      navigation.navigate('ProfileUser');
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: colors['background-white']}}>
      <BackComponent black back title={'EDIT PROFILE'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 20, marginBottom: 40}}>
        <TouchableOpacity
          onPress={pickImage}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          {image ? (
            <Image
              src={image ? image : user?.avatar_url}
              resizeMode="cover"
              style={styles.image}
            />
          ) : (
            <FontAwesome name="user-circle-o" size={120} color="black" />
          )}
        </TouchableOpacity>
        <View style={{paddingVertical: 20}}>
          <Controller
            control={control}
            render={({field: {onChange, value, name}}) => (
              <FormField
                placeholder={user?.full_name}
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
                placeholder={user?.phone_number}
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
                    placeholder={user?.level}
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
                    placeholder={user?.goal.replace('_', ' ')}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => onChange(item.value.replace(' ', '_'))}
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
                placeholder={user?.weight.toString()}
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
                placeholder={user?.height.toString()}
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
                    placeholder={user?.gender}
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
                placeholder={user?.age.toString()}
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
    right: 160,
  },
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
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
