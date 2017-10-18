import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'

import PieChart from '../Charts/PieChart'
import { CryptoColors } from "../../constants/Colors"


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
    pieChartTypeIndex: 0
  }

  _toggleChartData = () => {

  }

  render() {
    const { portfolio, tickers } = this.props
    const data = formatData(portfolio, tickers)

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this._toggleChartData}
      >
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
})
