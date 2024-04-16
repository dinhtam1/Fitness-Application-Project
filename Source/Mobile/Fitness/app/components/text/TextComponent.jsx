import {Text} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import {colors} from '../../constants/colors';
const TextComponent = props => {
  const {text, size, flex, font, color, styles, title, numberOfLine, align} =
    props;
  const fontSizeDefault = title
    ? textStyles['semibold-18']
    : textStyles['regular-12'];

  return (
    <Text
      style={[
        {
          color: color ?? colors['text-body'],
          flex: flex ?? 0,
          fontSize: size ? size : fontSizeDefault.fontSize,
          fontFamily: font ? font : fontSizeDefault.fontFamily,
          letterSpacing: fontSizeDefault.letterSpacing,
          textAlign: align ?? 'auto',
        },
        styles,
      ]}
      numberOfLine={numberOfLine}>
      {text}
    </Text>
  );
};

export default TextComponent;
