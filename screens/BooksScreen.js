import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DarkTheme from "../constants/DarkTheme"

import BaseText from '../components/BaseText'

export default class BooksScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BaseText style={styles.soonLabel}>
          Coming Soon
        </BaseText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.canvas,
  },
  soonLabel: {
    color: DarkTheme.valueText,
    fontSize: 18,
    textAlign: "center",
  }
});


// export default connect(
//   state => ({
//     tickers: state.market.tickers,
//     portfolioAssets: state.portfolio.portfolios[state.portfolio.selectedIndex].assets
//   }),
//   {
//     addAsset
//   }
// )(BooksScreen)
