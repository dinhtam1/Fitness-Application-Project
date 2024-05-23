import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    set => ({
      token: null,
      form: {
        weight: '',
        goal_weight: '',
        height: '',
        level: '',
        goal: '',
        gender: '',
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

export const useUserStore = create(set => ({
  user: null,
  setUser: userData => set({user: userData}),
}));

export const useCategoriesStore = create(set => ({
  categories: [],
  setCategories: categoriesData => set({categories: categoriesData}),
}));
