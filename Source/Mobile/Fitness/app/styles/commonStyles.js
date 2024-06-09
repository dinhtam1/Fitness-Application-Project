import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

export const common = StyleSheet.create({
  safeAreaView: {
    height: '100%',
    backgroundColor: colors['background-white'],
  },
  contain: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
