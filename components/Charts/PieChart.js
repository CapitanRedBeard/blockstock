import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  VictoryPie,
} from "victory-native";

import Loader from '../Loader'

const graphWidth = Dimensions.get('window').width - 50


function formatData(portfolio) {

  return portfolio.assets.map(asset => ({
    x: portfolio.symbol,
    y: point[1],
  }))
}

export default function PieChart({portfolio, tickers}) {
  return (
    <View style={styles.container}>
      <VictoryPie
        style={{ labels: styles.labels}}
        data={}
        innerRadius={50}
        height={graphWidth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: graphWidth,
    width: graphWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  labels: {
    fill: "white",
    fontSize: 12,
    fontFamily: DarkTheme.fontFamily
  },
});
