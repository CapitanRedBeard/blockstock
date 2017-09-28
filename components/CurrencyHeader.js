import React from 'react';
import { View, StyleSheet } from 'react-native';

import DarkTheme from '../constants/DarkTheme'

import BaseText from '../components/BaseText'

export default function CurrencyHeader({name, symbol}) {
  return (
    <View key="NameContainer" style={styles.nameContainer}>
      <BaseText style={styles.name}>{name}</BaseText>
      <BaseText style={styles.ticker}>{symbol}</BaseText>
    </View>
  )
}

const styles = StyleSheet.create({
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: DarkTheme.valueText,
  },
  ticker: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
})
