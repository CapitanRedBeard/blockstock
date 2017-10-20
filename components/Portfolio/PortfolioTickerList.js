import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'
import { getInTheBlackOrRedColor } from '../../constants/Colors'

import BaseText from '../../components/BaseText'
import CryptoIcon from '../../components/CryptoIcon'
import TickerListSorter from './TickerListSorter'
import AddAssetButton from './AddAssetButton'

import { calculateProfit, formatMoney, formatQuantity } from '../../helpers'

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
    sortIndex: 0,
    ascending: true,
  }

  _keyExtractor = (item, index) => index;

  onPressItem = ticker => {
    const { navigate } = this.props;
    navigate('Asset', {ticker: ticker, portfolioView: true})
  }

  _renderListItem = ({item}) => {
    const {symbol} = item
    const tickerData = this.props.tickers.find(t => t.symbol === item.symbol)
    const portfolioData = this.props.portfolio.assets.find(a => a.symbol === symbol)
    const { totalQuantity, totalCost } = portfolioData
    const { profitPercent, profit, currentValue } = calculateProfit(tickerData.price_usd, totalCost, totalQuantity)

    const percentColor = getInTheBlackOrRedColor(tickerData.percent_change_24h)

    return (
      <View style={styles.touchableWrapper} >
        <TouchableOpacity style={styles.touchableWrapper} onPress={() => this.onPressItem(tickerData)}>
          <View style={styles.listItemRowContainer}>
            <View key="NameContainer" style={styles.nameContainer}>
              <CryptoIcon symbol={tickerData.symbol} />
              <BaseText style={styles.ticker}>{tickerData.symbol}</BaseText>
            </View>
            <View key="Holding" style={styles.holdingContainer}>
              <BaseText style={styles.amountGained}>{formatMoney(currentValue)}</BaseText>
              <BaseText style={styles.quantity}>{formatQuantity(totalQuantity)}</BaseText>
            </View>
            <View key="ValueContainer" style={styles.valueContainer}>
              <BaseText style={styles.price}>
                ${tickerData.price_usd}
              </BaseText>
              <BaseText style={[styles.change, {color: percentColor}]}>
                {tickerData.percent_change_24h}%
              </BaseText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
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
    console.log("SortIndex", this.state.sortIndex, "_sortData", this._ascendingData(this._sortData(portfolio.assets)))

    return (
      <View style={styles.container}>
        <TickerListSorter sortBy={this.sortBy} ascending={this.state.ascending}/>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this._ascendingData(this._sortData(portfolio.assets))}
          extraData={tickers}
          renderItem={this._renderListItem}
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
  touchableWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  listItemRowContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: DarkTheme.cardBackground,
    borderRadius: 2,
  },
  listFooter: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nameContainer: {
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "row",
  },
  holdingContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  valueContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexShrink: 0,
  },
  ticker: {
    fontSize: 18,
    paddingLeft: 10,
    color: DarkTheme.valueText,
  },
  amountGained: {
    fontSize: 14,
    color: DarkTheme.valueText,
  },
  quantity: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
  price: {
    fontSize: 14,
    color: DarkTheme.valueText,
  },
  change: {
    fontSize: 12,
  },
  rank: {
    flexShrink: 1,
    marginLeft: -10,
    marginRight: 5,
    fontSize: 12,
    color: DarkTheme.valueText,
  }
})
