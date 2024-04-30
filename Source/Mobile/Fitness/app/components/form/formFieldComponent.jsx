import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {eye, eyeHide} from '../../assets';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import RowComponent from '../common/rowComponent';
import TextComponent from '../text/textComponent';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  inputStyles,
  containStyles,
  unit,
  error,
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
          fontFamily: fontFamilies['regular'],
        }}>
        {title}
      </Text>
      <View
        style={[
          {
            width: '100%',
            height: 64,
            paddingHorizontal: 16,
            backgroundColor: '#F5F5F5',
            borderRadius: 16,
            borderWidth: 2,
            borderColor: 'rgba(105, 105, 105, 0.25)',
            flexDirection: 'row',
            alignItems: 'center',
          },
          containStyles,
        ]}>
        <TextInput
          selectTextOnFocus
          style={[
            {
              flex: 1,
              color: colors['title'],
              fontSize: 16,
              fontFamily: fontFamilies['medium'],
            },
            inputStyles,
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors['text-placeholder']}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {unit && (
          <Text
            style={{
              color: colors['title'],
              fontSize: 18,
              fontFamily: fontFamilies['medium'],
              transform: [{translateX: -125}],
            }}>
            | {unit}
          </Text>
        )}

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
      {error && (
        <RowComponent justify="flex-start" styles={{paddingTop: 10}}>
          <TextComponent
            color={colors['fill-red']}
            font={fontFamilies['medium']}
            size={14}
            text={error}
          />
        </RowComponent>
      )}
    </View>
  );
};

export default FormField;
