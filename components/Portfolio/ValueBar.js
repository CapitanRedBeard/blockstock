import React from 'react';
import { View, StyleSheet } from 'react-native';

import { getInTheBlackOrRedColor } from '../../constants/Colors'
import DarkTheme from '../../constants/DarkTheme'

export default function ValueBar({percentFill, fillColor}) {
  const emptySpace = 1 - percentFill
  if(percentFill === 0) {
    return null
  }
  return (
    <View style={styles.container}>
      <View style={[styles.valueBar, {flex: percentFill, backgroundColor: fillColor}]}/>
      <View style={{flex: emptySpace}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end"
  },
  valueBar: {
    borderRadius: 3,
    height: 6,
    backgroundColor: DarkTheme.valueText,
  },
})
