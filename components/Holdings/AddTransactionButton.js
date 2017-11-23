import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from "react-redux"
import { LinearGradient } from 'expo';

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../../constants/DarkTheme'
import BaseText from '../../components/BaseText'

export default class AddTransactionButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        key="AddTransactionContainer"
        onPress={this.props.onPress}
      >
        <View>
          <BaseText style={styles.addButton}>
            {this.props.value}
          </BaseText>
        </View>
      </TouchableOpacity>
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
