import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CameraView, useCameraPermissions} from 'expo-camera';
import {MaterialIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {apiNutrition} from '../../apis/meal';
import {
  useAuthStore,
  useCommonStore,
  useUserStore,
} from '../../store/useAuthStore';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {useNavigation} from '@react-navigation/native';
import BackComponent from '../../components/header/backComponent';
import {BlurView} from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
  const {user} = useUserStore();
  const {token} = useAuthStore();
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState('off');
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [zoom, setZoom] = useState(0);
  const {isLoading, setIsLoading} = useCommonStore();
  const lastZoomValue = useRef(0);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        fetchData(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchData = async image => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('food', {
      type: `image/jpeg`,
      name: `photo.jpg`,
      uri: image,
    });
    if (image) {
      const response = await apiNutrition(user.userId, token, formData);
      if (response.statusCode === 200) {
        setIsLoading(false);
        setImage(null);
        navigation.navigate('DetailMeal', {mealId: response.data});
      } else {
        Toast.show(
          toastConfig({
            type: 'error',
            textMain: response.message,
            visibilityTime: 2000,
          }),
        );
      }
    }
  };

  const handleFlashToggle = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const onPinchEvent = event => {
    let zoomValue = lastZoomValue.current + (event.nativeEvent.scale - 1) / 10;
    if (zoomValue > 1) {
      zoomValue = 1;
    }
    if (zoomValue < 0) {
      zoomValue = 0;
    }
    setZoom(zoomValue);
  };

  const onPinchStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      lastZoomValue.current = zoom;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      fetchData(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}>
          <CameraView
            ref={cameraRef}
            flash={flash}
            style={styles.camera}
            zoom={zoom}
            facing={facing}>
            <View
              style={{
                position: 'absolute',
                top: 40,
                left: 0,
                right: 0,
                backgroundColor: 'transparent',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <TouchableOpacity onPress={handleFlashToggle}>
                {flash === 'off' ? (
                  <Ionicons name="flash-off-outline" size={35} color="white" />
                ) : (
                  <Ionicons name="flash" size={35} color="white" />
                )}
              </TouchableOpacity>
              <BackComponent back size={25} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonRight}
                onPress={toggleCameraFacing}>
                <MaterialIcons name="loop" size={60} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  height: 66,
                  width: 66,
                  borderWidth: 3,
                  borderRadius: 100,
                  borderColor: 'white',
                }}>
                <TouchableOpacity
                  onPress={handleTakePhoto}
                  style={styles.buttonMiddle}></TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.buttonLeft} onPress={pickImage}>
                <Ionicons name="images" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </PinchGestureHandler>
      ) : (
        <View style={styles.container}>
          <Image source={{uri: image}} style={styles.image} />
          {isLoading && (
            <>
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
              />
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    marginBottom: 80,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  buttonRight: {
    marginLeft: 70,
  },
  buttonMiddle: {
    height: 60,
    width: 60,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  buttonLeft: {
    marginRight: 70,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
