import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function BaseText(props) {
  return (
    <Text
      {...props}
      style={[styles.baseText, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'DINPro',
    backgroundColor: "transparent",
  },
});
