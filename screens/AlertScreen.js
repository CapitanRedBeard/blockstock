import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DarkTheme from "../constants/DarkTheme"
import { formatMoney, matchesFloat } from '../helpers'
import { AlertTypes } from '../constants/Types'

import { submitNotification } from '../actions/notifications'

import BaseText from '../components/BaseText'
import Input from '../components/Input'
import Switch from '../components/Switch'
import AddTransactionButton from "../components/Holdings/AddTransactionButton"

export default class AlertScreen extends React.Component {
  state = {
    below: null,
    above: null,
    alertType: 0
  }
  
  toggleAlertType = value => {
    this.setState({alertType: value})
  }

  setBelowPrice = value => {
    if(matchesFloat(value) || !value) {
      this.setState({below: value})
    }
  }

  setAbovePrice = value => {
    if(matchesFloat(value) || !value) {
      this.setState({above: value})
    }
  }

  onSubmit = () => {
    const { below, above, alertType } = this.state
    // this.props.submitNotification(below, above, alertType)
    this.setState({below: null, above: null})
  }

  render() {
    const { ticker } = this.props
    console.log("Alert has ticker: ", ticker)    
    const {below, above, alertType} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.alertHeader}>
          <View style={styles.alertSettingSection}>
            <View style={styles.currentPriceWrapper}>
              <Text style={styles.currentPriceLabel}>Current</Text>
              <Text style={styles.currentPrice}>{formatMoney(ticker.price_usd)}</Text>
              
            </View>
            <Switch
              selected={alertType}
              onPress={this.toggleAlertType}
              values={AlertTypes}
              labelStyle={styles.switchLabelStyle}
            />
          </View>
          
          <View style={styles.alertSettingSection}>
              <Input
                label="Below"
                value={below}
                placeholder={formatMoney(Number(ticker.price_usd) - 0.01)}
                onChange={this.setBelowPrice}
              />
              <Text style={styles.or}>OR</Text>
              <Input
                label="Above"
                value={above}
                placeholder={formatMoney(Number(ticker.price_usd) + 0.01)}
                onChange={this.setAbovePrice}
              />
          </View>
          <AddTransactionButton onPress={this.onSubmit} value="Save Alert"/>
        </View>
        <View style={styles.alerts}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 30
  },
  currentPriceWrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  currentPriceLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: DarkTheme.labelText,
  },
  currentPrice: {
    fontSize: 20,
    marginBottom: 5,
    color: DarkTheme.valueText,
  },
  alertSettingSection: {
    marginBottom: 20,
    flexDirection: "row",
  },
  switchLabelStyle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 16
  },
  inputWrapper: {
    flex: 1,
    padding: 5,
  },
  or: {
    padding: 10,
    alignSelf: "flex-end",
    fontSize: 14,
    color: DarkTheme.labelText,
  },
  aboveInput: {
    paddingLeft: 5,
  },
  alertHeader: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: DarkTheme.labelText
  },
  alerts: {
    flex: 1,
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
// )(AlertScreen)
