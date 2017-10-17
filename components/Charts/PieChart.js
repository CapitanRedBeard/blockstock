import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  VictoryPie,
} from "victory-native";

import DarkTheme from "../../constants/DarkTheme"
import { CryptoColors } from "../../constants/Colors"

const graphWidth = Dimensions.get('window').width - 50

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

export default function PieChart({portfolio, tickers}) {
  const data = formatData(portfolio, tickers)
  return (
    <View style={styles.container}>
      <VictoryPie
        style={{
          labels: {
            fill: "white",
            fontSize: 12,
            fontFamily: DarkTheme.fontFamily
          }
        }}
        data={data}
        innerRadius={50}
        height={graphWidth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
});
