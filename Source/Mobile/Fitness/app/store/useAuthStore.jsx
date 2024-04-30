import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    set => ({
      token: null,
      form: {
        full_name: '',
        phone_number: '',
        email: '',
        password: '',
        // weight: '',
        // goal_weight: '',
        // height: '',
        // level: '',
        // goal: '',
      },
      setToken: token => set({token}),
      setForm: form => set({form}),
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
