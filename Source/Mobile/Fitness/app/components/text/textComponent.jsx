import {Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';
import {textStyles} from '../../styles/textStyles';

const TextComponent = props => {
  const {
    text,
    size,
    flex,
    font,
    color,
    styles,
    title,
    numOfLine,
    align,
    space,
  } = props;

  const fontSizeDefault = title
    ? textStyles['semibold-18']
    : textStyles['regular-12'];

  return (
    <Text
      numberOfLines={numOfLine}
      style={[
        {
          color: color ?? colors['text'],
          flex: flex ?? 0,
          fontSize: size ? size : fontSizeDefault.fontSize,
          fontFamily: font ? font : fontSizeDefault.fontFamily,
          letterSpacing: fontSizeDefault.letterSpacing,
          textAlign: align ?? 'auto',
          letterSpacing: space ?? 0,
          
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
