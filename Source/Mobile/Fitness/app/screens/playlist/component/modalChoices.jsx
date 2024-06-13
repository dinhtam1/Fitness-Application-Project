import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import TextComponent from '../../../components/text/textComponent';
import CustomButton from '../../../components/button/buttonComponent';
import {Entypo} from '@expo/vector-icons';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';
import {apiAddExercise, apiGetAllLists} from '../../../apis/exerciseList';
import {useAuthStore, useUserStore} from '../../../store/useAuthStore';
import Toast from 'react-native-toast-message';
import {empty} from '../../../assets';
const {toastConfig} = require('../../../utils/toast');

const ModalChoices = ({isVisible, onClose, title, message, onConfirm}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.alertContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.button__cancel}>
            <Text style={styles.button__text__cancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.button__delete}>
            <Text style={styles.button__text__delete}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalChoices;

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button__cancel: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button__text__cancel: {
    color: 'black',
  },
  button__delete: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  button__text__delete: {
    color: 'white',
  },
});
