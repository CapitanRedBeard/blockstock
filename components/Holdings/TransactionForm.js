import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from "react-redux"
import { LinearGradient } from 'expo';

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../../constants/DarkTheme'
import BaseText from '../BaseText'
import Input from '../Input'
import Switch from '../Switch'
import AddTransactionButton from "./AddTransactionButton"

import { addTransaction } from '../../actions/portfolio'
import { TransactionTypes } from '../../constants/Types'

import { matchesFloat } from '../../helpers'

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props)
    const { tickerPrice } = this.props

    this.state = {
      transactionType: 0,
      quantity: "0",
      tradePrice: tickerPrice
    }
  }

  onSubmit = () => {
    const { transactionType, quantity, tradePrice } = this.state
    const { submitTransaction, tickerPrice } = this.props
    this.props.submitTransaction(transactionType, quantity, tradePrice)
    this.setState({quantity: "0", tradePrice: tickerPrice })
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
    const {submitTransaction} = this.props

    return (
      <View style={styles.container}>
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
              placeholder={"$100.00"}
              containerStyle={styles.tradePriceContainer}
              onChange={this.changeTradePrice}
            />
          </View>
        </View>
        <AddTransactionButton submitTransaction={this.submitTransaction}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 30
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
})
