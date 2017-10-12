import React from 'react';
import { connect } from "react-redux"

import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import DarkTheme from "../constants/DarkTheme"
import { getInTheBlackOrRedColor } from '../constants/Colors'
import { TimeFrames } from '../constants/Types'
import { formatMoney, formatSupply, getLowHighPrice, getChange } from '../helpers'

import { addAsset } from '../actions/portfolio'

import BaseText from '../components/BaseText'
import TickerSearchList from '../components/TickerSearchList'

class AddAssetModal extends React.Component {
  static navigationOptions = () => ({
    headerTitle: 'Add Asset',
  })

  onSelect = (symbol) => {
    this.props.addAsset(symbol)
  }

  render() {
    console.log("This,props", this.props)
    return (
      <View style={styles.container}>
        <TickerSearchList tickers={this.props.tickers} onSelect={this.onSelect}/>
      </View>
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
    tickers: state.market.tickers
  }),
  {
    addAsset
  }
)(AddAssetModal)
