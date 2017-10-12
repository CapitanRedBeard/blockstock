import React from 'react';
import { View, TextInput, FlatList, StyleSheet, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from "react-redux"

import DarkTheme from '../constants/DarkTheme';
import BaseText from './BaseText';

class TickerSearchList extends React.Component {

  _renderListItem = ({item}) => {
    console.log("An Item looks like", item)
    return (
      <View style={styles.listItem}>
        <BaseText style={styles.listItemText}>
          {item.symbol}
        </BaseText>
      </View>
    )
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const {onSelect, tickers} = this.props
    console.log("Tickers", tickers)
    return (
      <View>
        <View style={styles.searchContainer}>
          <FontAwesome
            name="search"
            size={12}
            style={styles.searchIcon}
            color={DarkTheme.valueText}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Enter Ticker..."
            selectionColor={DarkTheme.valueText}
            placeholderTextColor={DarkTheme.labelText}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={this._keyExtractor}
            data={tickers}
            renderItem={this._renderListItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: DarkTheme.canvas,
  },
  listItem: {
    height: 80,
    flex: 1,
    flexGrow: 1,
    backgroundColor: "purple",
    borderWidth: 1,
    borderColor: "red",
  },
  listItemText: {
    color: DarkTheme.valueText,
  },
  searchContainer: {
    backgroundColor: DarkTheme.canvas,
  },
  searchIcon: {
    position: "absolute",
    top: 16,
    left: 17,
    zIndex: 5,
  },
  searchBar: {
    paddingLeft: 26,
    paddingRight: 19,
    margin: 8,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: DarkTheme.cardBackground,
    fontSize: 14,
    color: DarkTheme.valueText,
    height: 40,
    borderRadius: Platform.OS === 'ios' ? 15 : 20,
    ...Platform.select({
      ios: {
        height: 30,
      },
      android: {
        borderWidth: 0,
      },
    }),
  }
});

export default connect(
  state => ({
    tickers: state.market.tickers
  }),
)(TickerSearchList)
