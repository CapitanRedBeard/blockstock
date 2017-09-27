import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
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

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <TickerCard ticker={item}/>
  );

  _renderHeader = () => {
    return <LabelText style={styles.label}>Cryptocurrencies</LabelText>
  }

  _onRefresh = () => {
    this.props.fetchTickers()
  }

  render() {
    const { tickers } = this.props.market

    return (
      <View style={styles.container}>
        {
          tickers.length ?
          <FlatList
            style={{flex: 1, flexGrow: 1}}
            ListHeaderComponent={this._renderHeader}
            data={tickers}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            initialNumToRender={20}
            onRefresh={this._onRefresh}
            refreshing={false}
          /> :
          <Loader/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: DarkTheme.canvas,
  },
  contentContainer: {
    paddingTop: 30,
  },
  label: {
    marginBottom: 10,
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
