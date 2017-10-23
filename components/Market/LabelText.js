import React from 'react';
import { StyleSheet } from 'react-native';
import BaseText from '../BaseText'
import DarkTheme from '../../constants/DarkTheme'

export default function LabelText(props) {
  return (
    <BaseText
      {...props}
      style={[styles.text, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: DarkTheme.labelText,
    backgroundColor: DarkTheme.canvas
  }
})
