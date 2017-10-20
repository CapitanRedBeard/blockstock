import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'

import PieChart from '../Charts/PieChart'
import BaseText from '../../components/BaseText'

import { CryptoColors, getInTheBlackOrRedColor } from "../../constants/Colors"
import { sumPortfolio, formatMoney, formatPercent } from '../../helpers'

const LABEL_THRESHOLD = 36
const width = Dimensions.get('window').width
const emptyDataPieChartFill = [{x: " ", y: 1, fill: DarkTheme.tintColor}]

function formatData(portfolio, tickers, totalValue) {
  let emptyData = true
  const data = portfolio.assets.map(asset => {
    const tickerData = tickers.find(t => t.symbol === asset.symbol)
    let dataLabel = " "
    if(asset.totalQuantity) {
      emptyData = false
    }

    if( asset.totalQuantity && asset.totalQuantity * tickerData.price_usd > totalValue / LABEL_THRESHOLD) {
      dataLabel = asset.symbol
    }

    return {
      x: dataLabel,
      y: asset.totalQuantity ? asset.totalQuantity * tickerData.price_usd : asset.totalQuantity,
      fill: CryptoColors[tickerData.symbol],
    }
  })
  return emptyData ? emptyDataPieChartFill : data
}

const ChartDataTypes = [
  {
    filterFunction: formatData,
    title: "Total Value"
  }
]

export default class PortfolioPieChart extends React.PureComponent {
  state = {
    chartDetailIndex: 0
  }

  _toggleChartDetails = () => {

  }

  _renderValueDetails = (totalValue, totalCost, totalProfit) => {
    const profit = totalProfit / totalCost
    return (
      <View style={styles.statsWrapper}>
        <BaseText style={styles.valueLabel}>{"Net Value"}</BaseText>
        <BaseText style={styles.value}>{formatMoney(totalValue)}</BaseText>
        <View style={styles.detailsWrapper}>
          <View style={styles.detailWrapper}>
            <BaseText style={styles.detailsLabel}>{"Cost"}</BaseText>
            <BaseText style={styles.details}>{formatMoney(totalCost)}</BaseText>
          </View>
          <View style={styles.detailWrapper}>
            <BaseText style={styles.detailsLabel}>{"Profit"}</BaseText>
            <BaseText style={styles.details}>{formatMoney(totalProfit)}</BaseText>
          </View>
        </View>
        {
          Boolean(profit) &&
          <BaseText style={[styles.profitPercent, {color: getInTheBlackOrRedColor(profit)}]}>
            {formatPercent(profit)}
          </BaseText>
        }
      </View>
    )
  }

  _renderChartDetails = (totalValue, totalCost, totalProfit ) => {
    const { chartDetailIndex } = this.state
    if(chartDetailIndex === 0) {
      return this._renderValueDetails(totalValue, totalCost, totalProfit)
    }
  }

  render() {
    const { portfolio, tickers } = this.props
    const { totalValue, totalCost, totalProfit } = sumPortfolio(portfolio.assets, tickers)
    const data = formatData(portfolio, tickers, totalValue)

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this._toggleChartDetails}
      >
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.statsContainer}>
            {this._renderChartDetails(totalValue, totalCost, totalProfit)}
          </View>
        </View>
        <PieChart
          data={data}
        />
      </TouchableOpacity>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsContainer: {
    width: 210,
    height: 210,
    borderRadius: 100,
    backgroundColor: DarkTheme.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsWrapper: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueLabel: {
    color: DarkTheme.valueText,
    fontSize: 24,
  },
  value: {
    color: DarkTheme.valueText,
    fontSize: 30,
  },
  detailsLabel: {
    color: DarkTheme.valueText,
    fontSize: 16,
  },
  details: {
    color: DarkTheme.valueText,
    fontSize: 20,
  },
  profitPercent: {
    color: DarkTheme.valueText,
    fontSize: 20,
  },
})
