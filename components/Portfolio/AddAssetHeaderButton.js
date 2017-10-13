import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../../constants/DarkTheme'
import BaseText from '../../components/BaseText'
import { modifyCurrency } from '../../actions/portfolio'

export default class AddCurrencyButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        key="AddCurrencyContainer"
        onPress={() => this.props.navigate('AddAssetModal')}
      >
        <View>
          <BaseText style={styles.addButton}>
            Add
          </BaseText>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  addButton: {
    fontSize: 16,
    color: DarkTheme.valueText,
  },
})
