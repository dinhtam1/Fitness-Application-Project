import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['background-white'],
  },
  'w-100': {
    width: '100%',
  },
  'h-100': {
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.form,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconAuth: {
    width: 46,
    height: 46,
    backgroundColor: colors['text-20'],
    borderRadius: 50,
  },
});
