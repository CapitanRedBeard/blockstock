import React from 'react';
import { connect } from "react-redux"

import { View, Text, ScrollView, StyleSheet } from 'react-native';

import DarkTheme from "../constants/DarkTheme"
import { getInTheBlackOrRedColor } from '../constants/Colors'
import { TimeFrames } from '../constants/Types'
import { formatMoney, formatSupply, getLowHighPrice, getChange } from '../helpers'
import { fetchChart } from '../actions/market'
import BaseText from '../components/BaseText'
import LineChart from '../components/Charts/LineChart';
import TimeFrameSwitch from '../components/TimeFrameSwitch';

class CurrencyScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTimeFrame: 0
    }
  }

  selectTimeFrame = (value) => {
    const { ticker } = this.props
    ticker && this.props.fetchChart(ticker.name, TimeFrames[value].label)
    this.setState({selectedTimeFrame: value})
  }

  componentWillMount() {
    const { ticker } = this.props
    ticker && this.props.fetchChart(ticker.name, TimeFrames[this.state.selectedTimeFrame].label)
  }

  render() {
    const { ticker } = this.props

    const scopedChartData = this.props.chartData[ticker.name] && this.props.chartData[ticker.name][TimeFrames[this.state.selectedTimeFrame].label]
    const change = getChange(scopedChartData && scopedChartData.price_usd)
    const currentPrice = formatMoney(ticker.price_usd)
    const {lowPrice, highPrice} = getLowHighPrice(scopedChartData && scopedChartData.price_usd)
    const percentColor = getInTheBlackOrRedColor(change)

    return (
      <ScrollView
        style={styles.container} contentContainerStyle={styles.containerContent}>
        <LineChart
          lineColor={DarkTheme.chartLine} gridColor={DarkTheme.chartGrid}
          data={scopedChartData }
        />

        <TimeFrameSwitch selected={this.state.selectedTimeFrame} onPress={this.selectTimeFrame}/>

        <View key="ValueContainer" style={styles.valueContainer}>
          <BaseText style={styles.price}>
            {currentPrice}
          </BaseText>
          <BaseText style={[styles.change, percentColor ? {color: percentColor} : null]}>
            {change ? change + "%" : "-"}
          </BaseText>
        </View>


        <View key="HighLowContainer" style={styles.highLowContainer}>
          <View>
            <BaseText style={styles.highLowLabel}>
              {"LOW"}
            </BaseText>
            <BaseText style={styles.highLowValue}>
              {lowPrice ? formatMoney(lowPrice) : "-"}
            </BaseText>
          </View>
          <View>
            <BaseText style={styles.highLowLabel}>
              {"HIGH"}
            </BaseText>
            <BaseText style={styles.highLowValue}>
              {highPrice ? formatMoney(highPrice) : "-"}
            </BaseText>
          </View>
        </View>

        <View key="MarketCapContainer" style={styles.statsContainer}>
          <BaseText style={styles.statLabel}>
            {"MARKET CAP"}
          </BaseText>
          <BaseText style={styles.statValue}>
            {formatMoney(ticker.market_cap_usd)}
          </BaseText>
        </View>

        <View key="24HourVolumeContainer" style={styles.statsContainer}>
          <BaseText style={styles.statLabel}>
            {"24HOUR VOLUME"}
          </BaseText>
          <BaseText style={styles.statValue}>
            {formatMoney(ticker["24h_volume_usd"])}
          </BaseText>
        </View>

        <View key="TotalSupplyContainer" style={styles.statsContainer}>
          <BaseText style={styles.statLabel}>
            {"AVAILABLE SUPPLY"}
          </BaseText>
          <BaseText style={styles.statValue}>
            {formatSupply(ticker.available_supply, ticker.symbol)}
          </BaseText>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: DarkTheme.canvas,
  },
  containerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  valueContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginVertical: 20,
  },
  price: {
    fontSize: 30,
    color: DarkTheme.valueText,
  },
  change: {
    fontSize: 22,
    color: DarkTheme.labelText,
  },
  highLowContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 20,
    width: 250,
    justifyContent: "space-between"
  },
  highLowLabel: {
    fontSize: 16,
    textAlign: "center",
    width: 100,
    // textAlign: "right",
    // paddingRight: 20,
    color: DarkTheme.labelText,
  },
  highLowValue: {
    fontSize: 16,
    textAlign: "center",

    // textAlign: "left",
    // flexGrow: 1,
    color: DarkTheme.valueText,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    width: 300,
  },
  statLabel: {
    fontSize: 14,
    width: 150,
    textAlign: "right",
    paddingRight: 20,
    color: DarkTheme.labelText,
  },
  statValue: {
    fontSize: 14,
    textAlign: "left",
    flexGrow: 1,
    color: DarkTheme.valueText,
  }
});


export default connect(
  state => ({
    chartData: state.market.chartData
  }),
  {
    fetchChart
  }
)(CurrencyScreen)
