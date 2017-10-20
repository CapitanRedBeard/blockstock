import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { getInTheBlackOrRedColor } from '../../constants/Colors'
import DarkTheme from '../../constants/DarkTheme'

import BaseText from '../../components/BaseText'
import CryptoIcon from '../../components/CryptoIcon'

import { calculateProfit, formatMoney, formatQuantity, formatPercent } from '../../helpers'

export default function PortfolioTickerListItem({item, tickers, portfolio}) {
  const {symbol} = item
  const tickerData = tickers.find(t => t.symbol === item.symbol)
  const portfolioData = portfolio.assets.find(a => a.symbol === symbol)
  const { totalQuantity, totalCost } = portfolioData
  const { profitPercent, profit, currentValue } = calculateProfit(tickerData.price_usd, totalCost, totalQuantity)

  const percentColor = getInTheBlackOrRedColor(profitPercent)

  return (
    <View style={styles.touchableWrapper} >
      <TouchableOpacity style={styles.touchableWrapper} onPress={() => this.onPressItem(tickerData)}>
        <View style={styles.listItemRowContainer}>
          <View key="NameContainer" style={styles.nameContainer}>
            <CryptoIcon symbol={tickerData.symbol} />
            <BaseText style={styles.ticker}>{tickerData.symbol}</BaseText>
          </View>
          <View key="Holding" style={styles.holdingContainer}>
            <BaseText style={styles.amountGained}>{formatMoney(currentValue)}</BaseText>
            <BaseText style={styles.quantity}>{formatQuantity(totalQuantity)}</BaseText>
          </View>
          <View key="ProfitContainer" style={styles.profitContainer}>
            <BaseText style={styles.profit}>{formatMoney(profit)}</BaseText>
            <BaseText style={[styles.profitPercent, {color: percentColor}]}>{formatPercent(profitPercent)}</BaseText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  listItemRowContainer: {
    flex: 1,
    paddingVertical: 10,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: DarkTheme.cardBackground,
    borderRadius: 2,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  holdingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  profitContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ticker: {
    fontSize: 18,
    paddingLeft: 10,
    color: DarkTheme.valueText,
  },
  amountGained: {
    fontSize: 14,
    color: DarkTheme.valueText,
  },
  quantity: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
  profit: {
    fontSize: 14,
    color: DarkTheme.valueText,
  },
  profitPercent: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
})
