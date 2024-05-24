import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, CameraType} from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';

const CameraScreen = () => {
  //   const [hasCameraPermission, setHasCameraPermission] = useState(null);
  //   const [image, setImage] = useState(null);
  //   const [type, setType] = useState(Camera.Constants.Type.back);
  //   const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  //   const cameraRef = useRef(null);

  //   useEffect(() => {
  //     (async () => {
  //       MediaLibrary.requestPermissionsAsync();
  //       const cameraStatus = await Camera.requestPermissionsAsync();
  //       setHasCameraPermission(cameraStatus.status === 'granted');
  //     })();
  //   }, []);
  return (
    <View>
      <Text>cameraScreen</Text>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
