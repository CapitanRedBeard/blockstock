import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import DarkTheme from '../../constants/DarkTheme'
import BaseText from '../../components/BaseText'

export default function TickerListSorter({sortBy}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerLabelContainer} onPress={() => sortBy(0)}>
        <BaseText style={styles.headerLabel}>{"NAME"}</BaseText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerLabelContainer} onPress={() => sortBy(1)}>
        <BaseText style={styles.headerLabel}>{"VALUE"}</BaseText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerLabelContainer} onPress={() => sortBy(2)}>
        <BaseText style={styles.headerLabel}>{"PROFIT"}</BaseText>
      </TouchableOpacity>
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  headerLabelContainer: {
    flex: 1,
  },
  headerLabel: {
    textAlign: "center",
    fontSize: 12,
    color: DarkTheme.labelText,
  },
})
