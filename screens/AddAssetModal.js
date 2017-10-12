import React from 'react';
import { connect } from "react-redux"

import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import DarkTheme from "../constants/DarkTheme"
import { getInTheBlackOrRedColor } from '../constants/Colors'
import { TimeFrames } from '../constants/Types'
import { formatMoney, formatSupply, getLowHighPrice, getChange } from '../helpers'

import { modifyCurrency } from '../actions/portfolio'

import BaseText from '../components/BaseText'
import TickerSearchList from '../components/TickerSearchList'

class AddAssetModal extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Add Asset',
    headerStyle: {
      backgroundColor: "red",
    },
    headerTintColor: "red"
  })


  render() {
    console.log("This,props", this.props.navigation)
    return (
      <View style={styles.container}>
        <View stlye={styles.headerContainer}>
          <TouchableOpacity
            style={styles.cancelContainer}
            onPress={() => this.props.navigation.goBack()}
          >
            <View>
              <BaseText style={styles.canelText}>
                Cancel
              </BaseText>
            </View>
          </TouchableOpacity>
          <BaseText style={styles.headerText}>
            Add Asset
          </BaseText>
          <TickerSearchList/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingTop: 15,
    backgroundColor: DarkTheme.canvas,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  canelText: {
    color: DarkTheme.valueText,
    fontSize: 14,
  },
  headerText: {
    color: DarkTheme.valueText,
    fontSize: 18,
    textAlign: "center",
  }
});


export default connect(
  state => ({
    tickers: state.market.tickers
  }),
  {
    modifyCurrency
  }
)(AddAssetModal)
