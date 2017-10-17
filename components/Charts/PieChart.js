import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  VictoryPie,
} from "victory-native";

import DarkTheme from "../../constants/DarkTheme"

const graphWidth = Dimensions.get('window').width - 50
const innerRadius = 105

export default function PieChart({data}) {
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
        padAngle={1}
        data={data}
        innerRadius={innerRadius}
        height={graphWidth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
});
