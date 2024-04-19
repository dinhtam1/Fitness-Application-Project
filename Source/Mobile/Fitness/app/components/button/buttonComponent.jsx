import {ActivityIndicator, Image, Text, TouchableOpacity} from 'react-native';
import {google} from '../../assets';

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
          backgroundColor: '#5D847D',
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
            color: 'white',
            fontSize: 22,
            fontWeight: 'regular',
          },
          textStyles,
        ]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
