import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'

import TickerListSorter from './TickerListSorter'
import AddAssetButton from './AddAssetButton'
import PortfolioTickerListItem from './PortfolioTickerListItem'
import { sumPortfolio } from '../../helpers'

function sort(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export default class PortfolioCard extends React.PureComponent {
  state = {
    sortIndex: 1,
    ascending: true,
  }

  _keyExtractor = (item, index) => index;

  onPressItem = ticker => {
    const { navigate } = this.props;
    navigate('Asset', {ticker: ticker, portfolioView: true})
  }

  _onRefresh = () => {
    this.props.fetchTickers()
  }

  sortBy = index => {
    const {ascending, sortIndex} = this.state
    if(index === sortIndex) {
      this.setState({ascending: !ascending})
    }else {
      this.setState({sortIndex: index, ascending: true})
    }
  }

  _sortData = data => {
    const { sortIndex } = this.state
    if(sortIndex === 0) {
      return data.sort((a, b) => sort(a.symbol.toUpperCase(), b.symbol.toUpperCase()))
    } else if(sortIndex === 1) {
      return data.sort((a, b) => {
        const {price_usd: aPrice} = this.props.tickers.find(t => t.symbol === a.symbol)
        const {price_usd: bPrice} = this.props.tickers.find(t => t.symbol === b.symbol)
        return sort(a.totalQuantity * aPrice, b.totalQuantity * bPrice)
      }).reverse()
    } else if(sortIndex === 2) {
      return data.sort((a, b) => {
        const {price_usd: aPrice} = this.props.tickers.find(t => t.symbol === a.symbol)
        const {price_usd: bPrice} = this.props.tickers.find(t => t.symbol === b.symbol)
        const aProfit = (a.totalQuantity * aPrice) - a.totalCost
        const bProfit = (b.totalQuantity * bPrice) - b.totalCost
        return sort(aProfit, bProfit)
      }).reverse()
    }
    return data
  }

  _ascendingData = data => {
    return this.state.ascending ? data : data.reverse()
  }

  render() {
    const { portfolio, navigate, tickers } = this.props

    const {totalValue, highestValue} = sumPortfolio(portfolio.assets, tickers)

    return (
      <View style={styles.container}>
        <TickerListSorter sortBy={this.sortBy} ascending={this.state.ascending}/>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this._ascendingData(this._sortData(portfolio.assets))}
          extraData={tickers}
          renderItem={({item}) => <PortfolioTickerListItem
                                  item={item}
                                  portfolio={portfolio}
                                  tickers={tickers}
                                  onPressItem={this.onPressItem}
                                  totalValue={totalValue}
                                  highestValue={highestValue}
                                />}
          initialNumToRender={20}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={false}
              title="Refreshing Assets"
              tintColor={DarkTheme.loaderColor}
              titleColor={DarkTheme.loaderColor}
            />
          }
          ListFooterComponent={
            <View style={styles.listFooter}>
              <AddAssetButton navigate={navigate} />
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },

  listFooter: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
})
