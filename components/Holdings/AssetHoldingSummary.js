import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from "react-redux"
import { LinearGradient } from 'expo';

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../../constants/DarkTheme'
import BaseText from '../../components/BaseText'
import { formatMoney } from '../../helpers'

export default class AssetHoldingSummary extends React.Component {
  render() {
    const { totalQuantity, currentValue, profitPercent, profit } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <BaseText style={styles.label}>
            {"Quantity"}
          </BaseText>
          <BaseText style={styles.value}>
            {totalQuantity}
          </BaseText>
        </View>
        <View style={styles.separator}/>
        <View style={styles.section}>
          <BaseText style={styles.label}>
            {"Value"}
          </BaseText>
          <BaseText style={styles.value}>
            {formatMoney(currentValue)}
          </BaseText>
        </View>
        <View style={styles.separator}/>
        <View style={styles.section}>
          <BaseText style={styles.label}>
            {"Profit"}
          </BaseText>
          <BaseText style={styles.value}>
            {formatMoney(profit)}
          </BaseText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    backgroundColor: DarkTheme.cardBackground,
    marginBottom: 20,
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: DarkTheme.labelText,
    flex: 1,
  },
  section: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: DarkTheme.labelText,
    fontSize: 16,
  },
  value: {
    color: DarkTheme.valueText,
    fontSize: 16,
  }
})
