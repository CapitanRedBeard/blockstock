import React from 'react';
import { Text } from 'react-native';

export default function BaseText(props) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'DINPro' }, props.style]}
    />
  );
}
