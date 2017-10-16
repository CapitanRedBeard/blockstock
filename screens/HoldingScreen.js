import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DarkTheme from "../constants/DarkTheme"

import { addTransaction } from '../actions/portfolio'
import BaseText from '../components/BaseText'
import AddTransactionButton from "../components/Holdings/AddTransactionButton"
import AssetHoldingSummary from "../components/Holdings/AssetHoldingSummary"
import TransactionForm from "../components/Holdings/TransactionForm"
import TransactionList from "../components/Holdings/TransactionList"

import { sumTransactions, calculateProfite } from '../helpers'

class HoldingScreen extends React.Component {
  submitTransaction = (transactionType, quantity, tradePrice) => {
    const { symbol } = this.props.navigation.state.params.ticker
    this.props.addTransaction(symbol, transactionType, quantity, tradePrice)
  }

  render() {
    const { portfolioAssets, navigation } = this.props
    const { symbol, price_usd } = navigation.state.params.ticker
    const portfolioData = portfolioAssets.find(a => a.symbol === symbol)

    if(!portfolioData) {
      return null
    }

    const { totalQuantity, totalCost } = sumTransactions(portfolioData.transactions)
    const { profitPercent, profit, currentValue } = calculateProfite(price_usd, totalCost, totalQuantity)

    return (
      <ScrollView style={styles.container}>
        <View>
          <AssetHoldingSummary
            totalQuantity={totalQuantity}
            currentValue={currentValue}
            profitPercent={profitPercent}
            profit={profit}
          />
        </View>
        <TransactionForm
          submitTransaction={this.submitTransaction}
          tickerPrice={price_usd}
        />
        <TransactionList
          transactions={portfolioData.transactions}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.canvas,
  },

});


export default connect(
  state => ({
    portfolioAssets: state.portfolio.portfolios[state.portfolio.selectedIndex].assets
  }),
  {
    addTransaction
  }
)(HoldingScreen)
