import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import DarkTheme from '../constants/DarkTheme'
import { getInTheBlackOrRedColor } from '../constants/Colors'

import BaseText from '../components/BaseText'

export default class TickerCard extends React.PureComponent {
  _onPress = () => {
    const { onPressItem, ticker } = this.props
    console.log("_onPress")

    onPressItem(ticker);
  };

  render() {
     const { ticker } = this.props

     const percentColor = getInTheBlackOrRedColor(ticker.percent_change_24h)

     return (
       <TouchableOpacity style={styles.touchableWrapper} onPress={this._onPress}>
         <View style={styles.container}>
           <BaseText style={styles.rank}>{ticker.rank}</BaseText>
           <View key="NameContainer" style={styles.nameContainer}>
             <BaseText style={styles.name}>{ticker.name}</BaseText>
             <BaseText style={styles.ticker}>{ticker.symbol}</BaseText>
           </View>
           <View key="ValueContainer" style={styles.valueContainer}>
             <BaseText style={styles.price}>
               ${ticker.price_usd}
             </BaseText>
             <BaseText style={[styles.change, {color: percentColor}]}>
               {ticker.percent_change_24h}%
             </BaseText>
           </View>
         </View>
       </TouchableOpacity>
     );
  }
}

const styles = StyleSheet.create({
  touchableWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
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
