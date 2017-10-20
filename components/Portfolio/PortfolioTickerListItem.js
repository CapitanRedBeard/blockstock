import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { getInTheBlackOrRedColor, CryptoColors } from '../../constants/Colors'
import DarkTheme from '../../constants/DarkTheme'

import BaseText from '../../components/BaseText'
import CryptoIcon from '../../components/CryptoIcon'
import ValueBar from './ValueBar'
import { calculateProfit, formatMoney, formatQuantity, formatPercent } from '../../helpers'

export default function PortfolioTickerListItem({item, tickers, portfolio, onPressItem, totalValue, highestValue}) {
  const {symbol} = item
  const tickerData = tickers.find(t => t.symbol === item.symbol)
  const portfolioData = portfolio.assets.find(a => a.symbol === symbol)
  const { totalQuantity, totalCost } = portfolioData
  const { profitPercent, profit, currentValue } = calculateProfit(tickerData.price_usd, totalCost, totalQuantity)

  const percentColor = getInTheBlackOrRedColor(profitPercent)
  const percentValue = currentValue / totalValue
  const percentOutOfHighestValue = currentValue / highestValue

  return (
    <View style={styles.touchableWrapper} >
      <TouchableOpacity style={styles.touchableWrapper} onPress={() => onPressItem(tickerData)}>
        <View style={styles.listItemRowContainer}>
          <View key="NameContainer" style={styles.nameContainer}>
            <CryptoIcon symbol={tickerData.symbol} />
            <BaseText style={styles.ticker}>{tickerData.symbol}</BaseText>
          </View>

          <View key="PercentValueContainer" style={styles.percentValueContainer}>
            <ValueBar percentFill={percentOutOfHighestValue} fillColor={CryptoColors[tickerData.symbol]}/>
            <BaseText style={styles.percentValue}>{formatPercent(percentValue)}</BaseText>
          </View>

          <View key="Value" style={styles.valueContainer}>
            <BaseText style={styles.value}>{formatMoney(currentValue)}</BaseText>
            <BaseText style={styles.quantity}>{formatQuantity(totalQuantity)}</BaseText>
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
  valueContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  percentValueContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ticker: {
    fontSize: 18,
    paddingLeft: 10,
    color: DarkTheme.valueText,
  },
  value: {
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
  percentValue: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
})
