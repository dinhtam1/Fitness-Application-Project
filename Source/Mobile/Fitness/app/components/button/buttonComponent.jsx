import {ActivityIndicator, Image, Text, TouchableOpacity} from 'react-native';
import {google} from '../../assets';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: colors['primary-color'],
          borderRadius: 10,
          minHeight: 62,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyles,
        isLoading && {opacity: 0.5},
      ]}
      disabled={isLoading}>
      {icon && (
        <Image source={icon} style={{width: 24, height: 24, marginRight: 10}} />
      )}
      <Text
        style={[
          {
            color: colors['text-white'],
            fontSize: 21,
            fontFamily: fontFamilies['semiBold'],
          },
          textStyles,
        ]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={colors['text-white']}
          size="small"
          style={{marginLeft: 8}}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
