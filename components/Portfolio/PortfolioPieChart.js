import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'

import PieChart from '../Charts/PieChart'
import BaseText from '../../components/BaseText'

import { CryptoColors } from "../../constants/Colors"
import { sumPortfolio, formatMoney } from '../../helpers'

const width = Dimensions.get('window').width

function formatData(portfolio, tickers) {

  return portfolio.assets.map(asset => {
    const tickerData = tickers.find(t => t.symbol === asset.symbol)

    return {
      x: asset.totalQuantity ? asset.symbol : " ",
      y: asset.totalQuantity,
      fill: CryptoColors[tickerData.symbol],
    }
  })
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

  _renderValueDetails = (totalValue, totalCost) => {
    return (
      <View style={styles.section}>
        <BaseText style={styles.valueLabel}>{"Value"}</BaseText>
        <BaseText style={styles.value}>{formatMoney(totalValue)}</BaseText>
        <BaseText style={styles.costLabel}>{"Cost"}</BaseText>
        <BaseText style={styles.cost}>{formatMoney(totalCost)}</BaseText>
      </View>
    )
  }

  _renderChartDetails = ({ totalValue, totalCost, totalProfit }) => {
    const { chartDetailIndex } = this.state
    if(chartDetailIndex === 0) {
      return this._renderValueDetails(totalValue, totalCost)
    }
  }

  render() {
    const { portfolio, tickers } = this.props
    const data = formatData(portfolio, tickers)

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this._toggleChartDetails}
      >
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.detialsContainer}>
            {this._renderChartDetails(sumPortfolio(portfolio.assets, tickers))}
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
  detialsContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: DarkTheme.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
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
  costLabel: {
    color: DarkTheme.valueText,
    fontSize: 16,
  },
  cost: {
    color: DarkTheme.valueText,
    fontSize: 20,
  },
})
