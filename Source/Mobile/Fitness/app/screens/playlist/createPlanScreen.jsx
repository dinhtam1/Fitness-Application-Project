import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackComponent from '../../components/header/backComponent';
import {common} from '../../styles/commonStyles';
import TextComponent from '../../components/text/textComponent';
import FormField from '../../components/form/formFieldComponent';
import {FontAwesome} from '@expo/vector-icons';
import CustomButton from '../../components/button/buttonComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import * as ImagePicker from 'expo-image-picker';
import {useAuthStore, useUserStore} from '../../store/useAuthStore';
import {apiCreatePlan} from '../../apis/exerciseList';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {
  button,
  message,
  navigator,
  placeholder,
  title,
} from '../../constants/text';

const CreatePlanScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const {user} = useUserStore();
  const {token} = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm();

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

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('cover-exercise', {
      type: `image/jpeg`,
      name: `photo.jpg`,
      uri: image,
    });
    formData.append('list_name', data.list_name);

    const response = await apiCreatePlan(user.userId, token, formData);
    if (response.statusCode === 200) {
      Toast.show(
        toastConfig({
          type: 'success',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
      navigation.navigate(navigator['playlist']);
      setImage(null);
    } else {
      Toast.show(
        toastConfig({
          type: 'error',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={common.safeAreaView}>
        <BackComponent back black title={title['new-workout']} />
        <View style={common.contain}>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: message['required']},
            }}
            render={({field: {onChange, value, name}}) => (
              <FormField
                title={'Workout Name'}
                placeholder={placeholder['workout']}
                handleChangeText={onChange}
                value={value}
                error={errors[name]?.message}
              />
            )}
            name="list_name"
          />

          <View style={{marginVertical: 40}}>
            <TextComponent
              text={'Playlist Image'}
              size={16}
              font={fontFamilies['medium']}
            />
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.button_image}>
              {image ? (
                <Image
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <FontAwesome name="image" size={220} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 120}}>
            <CustomButton
              title={button['create']}
              handlePress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePlanScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button_image: {
    backgroundColor: '#ccc',
    height: 300,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
