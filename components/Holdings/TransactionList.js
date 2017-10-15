import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../../constants/DarkTheme'
import Colors from '../../constants/Colors'

import BaseText from '../../components/BaseText'
import { TransactionTypes } from '../../constants/Types'

export default class TransactionList extends React.PureComponent {
  _keyExtractor = (item, index) => index;

  onPressItem = ticker => {
    const { navigate } = this.props;
    navigate('Asset', {ticker: ticker, portfolioView: true})
  }

  _renderListItem = ({item}) => {
    const {quantity, tradePrice, transactionType} = item
    const  typeLabel = TransactionTypes[transactionType].label
    let typeLabelStyle = styles.typeLabel

    return (
      <View style={styles.itemContainer} >
        <View style={styles.section}>
          <BaseText style={styles.value}>
            {typeLabel}
          </BaseText>
        </View>
        <View style={styles.section}>
          <BaseText style={styles.label}>
            {"Quantity"}
          </BaseText>
          <BaseText style={styles.value}>
            {quantity}
          </BaseText>
        </View>
        <View style={styles.section}>
          <BaseText style={styles.label}>
            {"Trade Price"}
          </BaseText>
          <BaseText style={styles.value}>
            {tradePrice}
          </BaseText>
        </View>
      </View>
    )
  }

  render() {
    const { transactions } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={transactions}
          renderItem={this._renderListItem}
          initialNumToRender={20}
          ListHeaderComponent={
            <BaseText style={styles.listHeader}>
              {"Transaction History"}
            </BaseText>
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
  itemContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: DarkTheme.cardBackground,
    borderRadius: 2,
  },
  itemSection: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  section: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: DarkTheme.labelText,
    fontSize: 16,
  },
  value: {
    color: DarkTheme.valueText,
    fontSize: 16,
  },
  listHeader: {
    color: DarkTheme.labelText,
    fontSize: 16,
    paddingLeft: 30,
  }
})
