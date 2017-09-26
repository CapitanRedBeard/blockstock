import React from 'react';
import { Text, StyleSheet } from 'react-native';
import DarkTheme from '../constants/DarkTheme'
export default function LabelText(props) {
  return (
    <Text
      {...props}
      style={[styles.text, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: DarkTheme.labelText,
  }
})
