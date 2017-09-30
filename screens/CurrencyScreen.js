import React from 'react';
import { connect } from "react-redux"

import { View, Text, ScrollView, StyleSheet } from 'react-native';

import DarkTheme from "../constants/DarkTheme"
import { getInTheBlackOrRedColor } from '../constants/Colors'
import { TimeFrames } from '../constants/Types'
import { formatMoney, formatSupply, getLowHighPrice, getChange } from '../helpers'
import { fetchChart } from '../actions/market'
import BaseText from '../components/BaseText'
import CurrencyHeader from '../components/CurrencyHeader'
import LineChart from '../components/Charts/LineChart';
import TimeFrameSwitch from '../components/TimeFrameSwitch';

class CurrencyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: CurrencyHeader(navigation.state.params),
    ...DarkTheme.navigationOptions
  })

  constructor(props) {
    super(props)
    this.state = {
      selectedTimeFrame: 0
    }
  }

  selectTimeFrame = (value) => {
    const { params } = this.props.navigation.state
    params && this.props.fetchChart(params.name, TimeFrames[value].label)
    this.setState({selectedTimeFrame: value})
  }

  componentWillMount() {
    const { params } = this.props.navigation.state
    params && this.props.fetchChart(params.name, TimeFrames[this.state.selectedTimeFrame].label)
  }

  render() {
    const { params } = this.props.navigation.state

    const scopedChartData = this.props.chartData[params.name] && this.props.chartData[params.name][TimeFrames[this.state.selectedTimeFrame].label]
    const change = getChange(scopedChartData && scopedChartData.price_usd)
    const currentPrice = formatMoney(params.price_usd)
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
            {formatMoney(params.market_cap_usd)}
          </BaseText>
        </View>

        <View key="24HourVolumeContainer" style={styles.statsContainer}>
          <BaseText style={styles.statLabel}>
            {"24HOUR VOLUME"}
          </BaseText>
          <BaseText style={styles.statValue}>
            {formatMoney(params["24h_volume_usd"])}
          </BaseText>
        </View>

        <View key="TotalSupplyContainer" style={styles.statsContainer}>
          <BaseText style={styles.statLabel}>
            {"AVAILABLE SUPPLY"}
          </BaseText>
          <BaseText style={styles.statValue}>
            {formatSupply(params.available_supply, params.available_supply)}
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
