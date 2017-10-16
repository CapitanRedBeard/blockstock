import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'
import { getInTheBlackOrRedColor } from '../../constants/Colors'

import BaseText from '../../components/BaseText'

const cardWidth = Dimensions.get('window').width - 50;
import { sumPortfolio, formatMoney } from '../../helpers'

export default class PortfolioCard extends React.PureComponent {
  render() {
    const { portfolio, index, tickers } = this.props
    const { totalValue, totalCost, totalProfit } = sumPortfolio(portfolio.assets, tickers)

    return (
      <LinearGradient
        style={styles.linearGradientContainer}
        colors={['#93F9B9', '#1D976C']}
      >
        <View style={styles.container}>
          <View style={styles.section}>
            <BaseText style={styles.valueLabel}>{"Value"}</BaseText>
            <BaseText style={styles.value}>{formatMoney(totalValue)}</BaseText>
          </View>
          <View style={styles.detailSection}>
            <View style={styles.section}>
              <BaseText style={styles.costLabel}>{"Cost"}</BaseText>
              <BaseText style={styles.cost}>{formatMoney(totalCost)}</BaseText>
            </View>
            <View style={styles.section}>
              <BaseText style={styles.profitLabel}>{"Profit"}</BaseText>
              <BaseText style={styles.profit}>{formatMoney(totalProfit)}</BaseText>
            </View>
          </View>
        </View>
      </LinearGradient>
     );
  }
}

const styles = StyleSheet.create({
  linearGradientContainer: {
    backgroundColor: '#000',
    width: cardWidth,
    height: 170,
    elevation: 12,
    borderRadius: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 3,
  },
  valueLabel: {
    color: DarkTheme.valueText,
    fontSize: 24,
  },
  value: {
    color: DarkTheme.valueText,
    fontSize: 30,
  },
  costLabel: {
    color: DarkTheme.valueText,
    fontSize: 16,
  },
  cost: {
    color: DarkTheme.valueText,
    fontSize: 20,
  },
  profitLabel: {
    color: DarkTheme.valueText,
    fontSize: 16,
  },
  profit: {
    color: DarkTheme.valueText,
    fontSize: 20,
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
})
