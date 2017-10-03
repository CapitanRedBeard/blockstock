import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../constants/DarkTheme'
import BaseText from '../components/BaseText'
import { modifyCurrency } from '../actions/portfolio'

export default class AddCurrencyButton extends React.Component {
  navigateToAddScreen() {

  }

  render() {
    console.log("Add Currency Button Props", this.props)
    return (
      <TouchableHighlight
        key="AddCurrencyContainer"
        onPress={() => this.props.navigate('AddAssetModal')}
      >
        <View>
          <BaseText style={styles.addButton}>
            Add
          </BaseText>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  addButton: {
    fontSize: 16,
    color: DarkTheme.valueText,
  },
})
