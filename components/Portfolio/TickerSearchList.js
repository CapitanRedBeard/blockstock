import React from 'react';
import { View, TextInput, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { connect } from "react-redux"

import DarkTheme from '../../constants/DarkTheme';
import BaseText from '../BaseText';

export default class TickerSearchList extends React.Component {
  state = {
    inputValue: ""
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _renderListItem = ({item}) => {
    const { portfolioAssets, onSelect } = this.props
    const assetExists = Boolean(portfolioAssets.find(a => a.symbol === item.symbol))
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => onSelect(item.symbol)}>
        <View style={styles.listItemContainer}>
          <View key="NameContainer" style={styles.listItemNameContainer}>
            <BaseText style={styles.listItemName}>
              {item.name}
            </BaseText>
            <BaseText style={styles.listItemSymbol}>
              {item.symbol}
            </BaseText>
          </View>
          <View key="IconContainer" style={styles.listItemIconContainer}>
            {
              assetExists ?
              <Ionicons
                name="ios-arrow-forward"
                size={20}
                style={styles.itemIcon}
                color={DarkTheme.valueText}
              /> :
              <Ionicons
                name="ios-add"
                size={20}
                style={styles.itemIcon}
                color={DarkTheme.valueText}
              />
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const {filterList, portfolioAssets} = this.props
    console.log("New portfolioAssets: ", portfolioAssets)
    const data = filterList(this.state.inputValue)
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="ios-search"
            size={12}
            style={styles.searchIcon}
            color={DarkTheme.valueText}
          />
          <TextInput
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            style={styles.searchBar}
            placeholder="Enter Ticker..."
            selectionColor={DarkTheme.valueText}
            placeholderTextColor={DarkTheme.labelText}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            extraData={portfolioAssets}
            keyExtractor={this._keyExtractor}
            data={data}
            renderItem={this._renderListItem}
            initialNumToRender={20}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "stretch",
    backgroundColor: DarkTheme.canvas,
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: DarkTheme.canvas,
  },
  listItemNameContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  listItemIconContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexShrink: 0,
  },
  listItem: {
    flex: 1,
    flexGrow: 1,
  },
  listItemContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  listItemName: {
    fontSize: 18,
    color: DarkTheme.valueText,
  },
  listItemSymbol: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
  searchContainer: {
    backgroundColor: DarkTheme.canvas,
  },
  searchIcon: {
    position: "absolute",
    top: 16,
    left: 17,
    zIndex: 5,
    backgroundColor: "transparent",
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

// export default connect(
//   state => ({
//     tickers: state.market.tickers
//   }),
// )(TickerSearchList)
