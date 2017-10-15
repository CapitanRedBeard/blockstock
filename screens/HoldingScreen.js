import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DarkTheme from "../constants/DarkTheme"

import BaseText from '../components/BaseText'
import AddTransactionButton from "../components/Holdings/AddTransactionButton"

export default class HoldingScreen extends React.Component {
  navigateToTransaction = () => {
    const { navigation } = this.props
    const { ticker } = navigation.state.params

    navigation.navigate("AddTransaction", {ticker: ticker})
  }

  render() {
    return (
      <View style={styles.container}>
        <AddTransactionButton navigateToTransaction={this.navigateToTransaction}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: DarkTheme.canvas,
  },
});


// export default connect(
//   state => ({
//     tickers: state.market.tickers,
//     portfolioAssets: state.portfolio.portfolios[state.portfolio.selectedIndex].assets
//   }),
//   {
//     addAsset
//   }
// )(HoldingScreen)
