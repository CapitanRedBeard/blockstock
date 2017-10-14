import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from "react-redux"
import { LinearGradient } from 'expo';

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../../constants/DarkTheme'
import BaseText from '../../components/BaseText'
import { modifyCurrency } from '../../actions/portfolio'

export default class AddCurrencyButton extends React.Component {
  render() {
    const { navigate } = this.props
    return (
      <View
        style={styles.container}
      >
        <TouchableOpacity
          key="AddCurrencyContainer"
          onPress={() => navigate('AddAssetModal')}
        >
          <View>
            <BaseText style={styles.addButton}>
              Add Asset
            </BaseText>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: DarkTheme.buttonColor,
    backgroundColor: "transparent",
    borderRadius: 3,
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    fontSize: 18,
    color: DarkTheme.buttonColor,
    textAlign: "center"
  },
})
