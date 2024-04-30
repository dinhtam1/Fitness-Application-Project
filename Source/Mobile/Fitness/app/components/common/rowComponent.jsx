import {View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';

const RowComponent = props => {
  const {styles, justify, alignItems, children, gap} = props;

  const localStyle = [
    globalStyles.row,
    {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      justifyContent: justify ?? 'center',
      alignItems: alignItems ?? 'center',
      gap: gap ?? 0,
    },
    styles,
  ];

  return <View style={localStyle}>{children}</View>;
};

export default RowComponent;
