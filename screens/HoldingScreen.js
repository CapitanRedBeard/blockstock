import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DarkTheme from "../constants/DarkTheme"

import { addTransaction } from '../actions/portfolio'
import Switch from '../components/Switch'
import BaseText from '../components/BaseText'
import Input from '../components/Input'
import AddTransactionButton from "../components/Holdings/AddTransactionButton"

import { TransactionTypes } from '../constants/Types'
import { matchesFloat } from '../helpers'

class HoldingScreen extends React.Component {
  constructor(props) {
    super(props)
    const { price_usd } = this.props.navigation.state.params.ticker

    this.state = {
      transactionType: 0,
      quantity: 0,
      tradePrice: price_usd
    }
  }

  submitTransaction = transaction => {
    const { symbol } = this.props.navigation.state.params.ticker
    this.props.addTransaction(symbol, transaction)
  }

  toggleTransactionType = value => {
    this.setState({transactionType: value})
  }

  changeQuantity = value => {
    if(matchesFloat(value) || !value) {
      this.setState({quantity: value})
    }
  }

  changeTradePrice = value => {
    if(matchesFloat(value) || !value) {
      this.setState({tradePrice: value})
    }
  }

  render() {
    const { transactionType, quantity, tradePrice } = this.state
    const { portfolioAssets, navigation } = this.props
    const { symbol } = navigation.state.params.ticker
    const portfolioData = portfolioAssets.find(a => a.symbol === symbol)

    return (
      <ScrollView style={styles.container}>
        <Switch
          selected={transactionType}
          onPress={this.toggleTransactionType}
          values={TransactionTypes}
          labelStyle={styles.switchLabelStyle}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Input
              label="Quantity"
              value={quantity}
              placeholder={"0"}
              onChange={this.changeQuantity}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Input
              label="Trade Price"
              value={tradePrice}
              placeholder={"$123.00"}
              containerStyle={styles.tradePriceContainer}
              onChange={this.changeTradePrice}
            />
          </View>
        </View>
        <AddTransactionButton submitTransaction={this.submitTransaction}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: DarkTheme.canvas,
  },
  switchLabelStyle: {
    fontSize: 20
  },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
    flexDirection: "row",
  },
  inputWrapper: {
    flex: 1,
    padding: 5,
  }
});


export default connect(
  state => ({
    portfolioAssets: state.portfolio.portfolios[state.portfolio.selectedIndex].assets
  }),
  {
    addTransaction
  }
)(HoldingScreen)
