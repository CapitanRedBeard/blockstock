import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { connect } from "react-redux"

import DarkTheme from '../constants/DarkTheme';

import { fetchTickers } from '../actions/market';
import LabelText from '../components/LabelText';
import TickerCard from '../components/TickerCard';
import Loader from '../components/Loader';
import { ThumbnailLineChart } from '../components/Charts/ThumbnailLineChart';

class MarketScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    console.log("Fetching tickers componentWillMount")
    this.props.fetchTickers()
  }

  render() {
    const { tickers } = this.props.market
    console.log("MarketScreen Props: ", tickers)

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <LabelText>Cryptos</LabelText>
          {
            tickers.length ? tickers.map((t,i) => <TickerCard key={i} ticker={t}/>) : <Loader/>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: DarkTheme.canvas,
  },
  contentContainer: {
    paddingTop: 30,
  },
});


export default connect(
  state => ({
    market: state.market
  }),
  {
    fetchTickers
  }
)(MarketScreen)
