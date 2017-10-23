import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  VictoryLine,
  VictoryStack,
  VictoryArea,
  VictoryChart,
  VictoryAxis
} from "victory-native";

import Loader from '../Loader'

const width = Dimensions.get('window').width

function getMinY(data) {
  return data.reduce((min, p) => p[1] < min ? p[1] : min, data[0][1]);
}

function getMaxY(data) {
  return data.reduce((max, p) => p[1] > max ? p[1] : max, data[0][1]);
}

function formatData(data) {
  return data.map(point => ({
    x: point.time,
    y: point.close,
  }))
}

export default function LineChart({lineColor, gridColor, data}) {
  return (
    <View style={styles.container}>
        <View key="line0" style={[styles.line, {backgroundColor: gridColor, top: 0, opacity: 0.25}]}/>
        <View key="line1" style={[styles.line, {backgroundColor: gridColor, top: 40, opacity: 0.2}]}/>
        <View key="line2" style={[styles.line, {backgroundColor: gridColor, top: 80, opacity: 0.15}]}/>
        <View key="line3" style={[styles.line, {backgroundColor: gridColor, top: 120, opacity: 0.1}]}/>
        <View key="line4" style={[styles.line, {backgroundColor: gridColor, top: 160, opacity: 0.05}]}/>

        {
          data ? <VictoryLine
            height={200}
            width={width}
            padding={0}
            style={{
              data: { stroke: lineColor },
            }}
            data={formatData(data)}
          /> :
          <Loader/>
        }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  graphContainer: {
    flex: 1,
    height: 300,
    // alignSelf: "stretch",
    // flexGrow: 1,
    // position: "relative",
  },

  line: {
    flex: 1,
    height: 1,
    top: 0,
    width: width,
    position: "absolute",
  },

});
