import React from 'react';
import { connect } from "react-redux"
import Fuse from 'fuse.js'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import DarkTheme from "../constants/DarkTheme"
import { getInTheBlackOrRedColor } from '../constants/Colors'
import { TimeFrames } from '../constants/Types'
import { formatMoney, formatSupply, getLowHighPrice, getChange } from '../helpers'

import { addAsset } from '../actions/portfolio'

import BaseText from '../components/BaseText'
import TickerSearchList from '../components/Portfolio/TickerSearchList'

class AddAssetModal extends React.Component {
  static navigationOptions = () => ({
    headerTitle: 'Add Asset',
  })

  onSelect = (ticker, added) => {
    if(added) {
      this.props.navigation.navigate('Asset', {ticker: ticker, portfolioView: true})
    }else {
      this.props.addAsset(ticker.symbol)
    }
  }

  filterList = (text) => {
    const {tickers} = this.props
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "symbol",
        "name"
      ]
    };

    if(!text) {
      return tickers
    }
    var fuse = new Fuse(tickers, options); // "list" is the item array
    return fuse.search(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <TickerSearchList
          filterList={this.filterList}
          onSelect={this.onSelect}
          portfolioAssets={this.props.portfolioAssets}/>
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
    tickers: state.market.tickers,
    portfolioAssets: state.portfolio.portfolios[state.portfolio.selectedIndex].assets
  }),
  {
    addAsset
  }
)(AddAssetModal)
