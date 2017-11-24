import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DarkTheme from "../constants/DarkTheme"
import { formatMoney, matchesFloat } from '../helpers'
import { AlertTypes } from '../constants/Types'

import { submitNotification, removeNotification } from '../actions/notifications'

import BaseText from '../components/BaseText'
import Input from '../components/Input'
import Switch from '../components/Switch'
import AddTransactionButton from "../components/Holdings/AddTransactionButton"

class AlertScreen extends React.Component {
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
    const { symbol } = this.props.ticker
    this.props.submitNotification(below, above, alertType, symbol)
    this.setState({below: null, above: null})
  }

  deleteNotification = index => {
    const {ticker: {symbol}, removeNotification} = this.props
    removeNotification(index, symbol)
  }

  renderNotificaitonItem = ({above, alertType, below}, index) => {
    return (
      <View style={styles.itemContainer} >
        <View key="type" style={styles.section}>
          <BaseText style={styles.value}>
            {AlertTypes[alertType].label}
          </BaseText>
        </View>
        {
          below && (
            <View style={styles.section}>
              <BaseText style={styles.label}>
                {"Below"}
              </BaseText>
              <BaseText style={styles.value}>
                {formatMoney(below)}
              </BaseText>
            </View>
          )
        }
        {
          above && (
            <View style={styles.section}>
              <BaseText style={styles.label}>
                {"Above"}
              </BaseText>
              <BaseText style={styles.value}>
                {formatMoney(above)}
              </BaseText>
            </View>
          )
        }
        <View style={styles.deleteSection}>
          <TouchableOpacity style={styles.touchableWrapper} onPress={() => this.deleteNotification(index)}>
            <Ionicons
              name="ios-trash-outline"
              size={24}
              color={DarkTheme.valueText}
            />
          </TouchableOpacity>          
        </View>
      </View>
    )
  }

  render() {
    const { ticker, notifications } = this.props
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
        <ScrollView style={styles.alerts}>
          {
            notifications.map((notification, index) => this.renderNotificaitonItem(notification, index))
          }
        </ScrollView>
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
  },
  itemContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: DarkTheme.cardBackground,
    borderRadius: 2,
  },
  section: {
    flex: 1,
    padding: 10,
  },
  deleteSection: {
    flex: 0,
    padding: 10,
  },
  label: {
    color: DarkTheme.labelText,
    fontSize: 12,
  },
  value: {
    color: DarkTheme.valueText,
    fontSize: 14,
  },
});

export default connect(
  (state, ownProps) => {
    const notifications = state.notifications[ownProps.ticker && ownProps.ticker.symbol] || []
    return {
      notifications  
    }
  },
  {
    submitNotification,
    removeNotification
  }
)(AlertScreen)
