import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DarkTheme from '../constants/DarkTheme'
export default function TickerCard(props) {
  const { ticker } = props
  return (
    <View style={styles.container} >
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    height: 50,
    color: DarkTheme.cardBackground,
    borderWidth: 2,
  }
})
