import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import BaseText from './BaseText'
import DarkTheme from '../constants/DarkTheme'

export default function Input({label, value, onChange, placeholder}) {
  return (
    <View style={styles.container} >
      <BaseText style={styles.labelStyle}>
        {label}
      </BaseText>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={styles.inputStyle}
        placeholderTextColor={DarkTheme.labelText}
        underlineColorAndroid="transparent"
        selectionColor={DarkTheme.tintColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  inputStyle: {
    height: 40,
    padding: 5,
    fontSize: 16,
    borderWidth: 0,
    borderRadius: 3,
    color: DarkTheme.valueText,
    backgroundColor: DarkTheme.cardBackground,
  },
  labelStyle: {
    fontSize: 14,
    marginBottom: 5,
    color: DarkTheme.labelText,
  },
})
