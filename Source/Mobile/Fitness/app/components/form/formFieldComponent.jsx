import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {eye, eyeHide} from '../../assets';
import {colors} from '../../constants/colors';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[{marginTop: 8}, otherStyles]}>
      <Text
        style={{
          color: colors['text'],
          fontWeight: '400',
          fontSize: 16,
          lineHeight: 24,
          paddingBottom: 8,
        }}>
        {title}
      </Text>

      <View
        style={{
          width: '100%',
          height: 64,
          paddingHorizontal: 16,
          backgroundColor: '#F5F5F5',
          borderRadius: 16,
          borderWidth: 2,
          borderColor: 'rgba(105, 105, 105, 0.25)',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            flex: 1,
            color: 'black',
            fontSize: 16,
            fontFamily: 'Poppins-Semibold',
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? eye : eyeHide}
              style={{width: 24, height: 24}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
