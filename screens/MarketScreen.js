import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SectionList
} from 'react-native';
import { WebBrowser } from 'expo';
import { connect } from "react-redux"

import DarkTheme from '../constants/DarkTheme';

import { fetchTickers } from '../actions/market';
import LabelText from '../components/LabelText';
import TickerCard from '../components/TickerCard';
import Loader from '../components/Loader';

class MarketScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Market',
    ...DarkTheme.navigationOptions
  };

  componentWillMount() {
    this.props.fetchTickers()
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <TickerCard ticker={item} onPressItem={this.onPressItem}/>
  );

  _renderSectionHeader = ({section}) => {
    return <LabelText style={styles.label}>{section.title}</LabelText>
  }

  _onRefresh = () => {
    this.props.fetchTickers()
  }

  onPressItem = ticker => {
    const { navigate } = this.props.navigation;
    navigate('Currency', { ...ticker})
  }

  render() {
    const { tickers, favorites } = this.props.market

    const favoriteTickers = tickers.filter(ticker => Boolean(favorites[ticker.symbol]))
    const otherTickers = tickers.filter(ticker => !Boolean(favorites[ticker.symbol]))
    const sections = []
    if(favoriteTickers.length) {
      sections.push({title: `Favorite Currencies`,  data: favoriteTickers})
    }
    sections.push({title: `Other Currencies`,  data: otherTickers})

    return (
      <View style={styles.container}>
        {
          tickers.length ?
          <SectionList
            sections={sections}
            keyExtractor={this._keyExtractor}
            renderSectionHeader={this._renderSectionHeader}
            renderItem={this._renderItem}
            initialNumToRender={20}
            onRefresh={this._onRefresh}
            refreshing={false}
          /> : <Loader/>
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
    backgroundColor: DarkTheme.canvas,
  },
  label: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
