import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'
import { getInTheBlackOrRedColor } from '../../constants/Colors'

import BaseText from '../../components/BaseText'
import AddAssetButton from './AddAssetButton'

export default class PortfolioCard extends React.PureComponent {
  _keyExtractor = (item, index) => index;

  _renderListItem = ({item}) => {
    console.log("Items", item)

    return (
      <View style={styles.touchableWrapper} >
        <TouchableOpacity style={styles.touchableWrapper} onPress={this._onPress}>
          <View style={styles.listItemRowContainer}>
            <View key="NameContainer" style={styles.nameContainer}>
              <BaseText style={styles.ticker}>{item.symbol}</BaseText>
            </View>
            <View key="ValueContainer" style={styles.valueContainer}>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
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
          /> :
          <View style={styles.noDataContainer}>
            <BaseText style={styles.noDataMessage}>
              {"Add an asset to start this portfolio"}
            </BaseText>
            <AddAssetButton
              colors={portfolio.gradient}
              navigate={navigate} />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  noDataContainer: {
    marginTop: 20,
    width: 200,
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
  valueContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexShrink: 0,
  },
  name: {
    fontSize: 18,
    color: DarkTheme.valueText,
  },
  ticker: {
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
