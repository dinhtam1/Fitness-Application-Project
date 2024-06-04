import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {apiGetMe} from '../apis';

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
      isShowSplash: true,
      setIsShowSplash: status => set({isShowSplash: status}),
      setToken: token => set({token}),
      setForm: form => set({form}),
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export const useUserStore = create(
  persist(
    set => ({
      user: null,
      setUser: userData => set({user: userData}),
      getUser: async (userId, token) => {
        const response = await apiGetMe(userId, token);
        if (response?.status === 200) {
          set({user: response.data});
        }
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export const useCategoriesStore = create(set => ({
  categories: [],
  setCategories: categoriesData => set({categories: categoriesData}),
}));

export const useMealsStore = create(set => ({
  meals: [],
  setMeals: mealsData => set({meals: mealsData}),
}));

export const useAlarmStore = create(set => ({
  alarms: [],
  setAlarms: alarmsData => set({alarms: alarmsData}),
}));

export const useCommonStore = create(set => ({
  isLoading: false,
  setIsLoading: status => set({isLoading: status}),
}));
