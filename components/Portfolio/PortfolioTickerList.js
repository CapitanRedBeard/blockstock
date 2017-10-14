import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'
import { getInTheBlackOrRedColor } from '../../constants/Colors'

import BaseText from '../../components/BaseText'
import AddAssetButton from './AddAssetButton'

export default class PortfolioCard extends React.PureComponent {
  _keyExtractor = (item, index) => index;

  _renderListItem = ({item}) => {
    const {symbol, quantity} = item
    const tickerData = this.props.tickers.find(t => t.symbol === item.symbol)
    const percentColor = getInTheBlackOrRedColor(tickerData.percent_change_24h)

    const amountGained = quantity ? `$${tickerData.price_usd * quantity}` : "-"

    return (
      <View style={styles.touchableWrapper} >
        <TouchableOpacity style={styles.touchableWrapper} onPress={this._onPress}>
          <View style={styles.listItemRowContainer}>
            <View key="NameContainer" style={styles.nameContainer}>
              <BaseText style={styles.ticker}>{tickerData.symbol}</BaseText>
            </View>
            <View key="Holding" style={styles.holdingContainer}>
              <BaseText style={styles.amountGained}>{amountGained}</BaseText>
              <BaseText style={styles.quantity}>{quantity}</BaseText>
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

  render() {
    console.log("List props", this.props)

    const { portfolio, navigate, tickers } = this.props
    const assetsExist = Boolean(Object.keys(portfolio.assets).length)
    return (
      <View style={styles.container}>
        {
          assetsExist ?
          <FlatList
            keyExtractor={this._keyExtractor}
            data={portfolio.assets}
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
          /> :
          <View style={styles.noDataContainer}>
            <View style={styles.noDataWrapper}>
              <BaseText style={styles.noDataMessage}>
                {"Add an asset to start this portfolio"}
              </BaseText>
              <AddAssetButton
                colors={portfolio.gradient}
                navigate={navigate} />
            </View>
          </View>
        }
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
  noDataContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  noDataWrapper: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataMessage: {
    color: DarkTheme.valueText,
    fontSize: 24,
    textAlign: "center"
  },
  touchableWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  listItemRowContainer: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: DarkTheme.cardBackground,
    borderRadius: 2,
  },
  nameContainer: {
    justifyContent: "center",
    flexGrow: 1,
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
    color: DarkTheme.valueText,
  },
  amountGained: {
    fontSize: 18,
    color: DarkTheme.valueText,
  },
  quantity: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
  price: {
    fontSize: 18,
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
