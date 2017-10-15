import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import CurrencyScreen from './CurrencyScreen';
import HoldingScreen from './HoldingScreen';
import AlertScreen from './AlertScreen';
import BooksScreen from './BooksScreen';

import CurrencyHeader from '../components/Market/CurrencyHeader'
import FavoriteButton from '../components/Market/FavoriteButton';
import RemoveButton from '../components/Market/RemoveButton';
import DarkTheme from "../constants/DarkTheme"

const width = Dimensions.get('window').width

const TABS = {
  holding: {
    key: 'holding',
    title: 'Holding'
  },
  currency: {
    key: 'currency',
    title: 'Stats'
  },
  books: {
    key: 'books',
    title: 'Books'
  },
  alerts: {
    key: 'alerts',
    title: 'Alerts'
  }
}

export default class AssetScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { portfolioView, ticker } = navigation.state.params
    return {
      headerTitle: CurrencyHeader(ticker),
      headerRight: portfolioView ?
                    <RemoveButton symbol={ticker.symbol} goBack={navigation.goBack}/> :
                    <FavoriteButton symbol={ticker.symbol}/>,
      ...DarkTheme.navigationOptions
    }
  }

  constructor(props) {
    super(props)
    const stateObj = {
      index: 0,
      routes: [
        TABS.currency,
        TABS.books,
        TABS.alerts,
      ],
    };
    const { portfolioView } = props.navigation.state.params

    if(portfolioView) {
      stateObj.routes.unshift(TABS.holding)
    }

    this.state = stateObj
  }

  _handleIndexChange = index => {
    this.setState({
      index,
    });
  };

  _renderHeader = props => {
    const tabLength = this.state.routes.length
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={{width: width/tabLength}}
        labelStyle={styles.label}
      />
    );
  };

  _renderScene = ({ route }) => {
    const {params} = this.props.navigation.state
    switch (route.key) {
      case TABS.currency.key:
        return <CurrencyScreen {...params}/>
      case TABS.holding.key:
        return <HoldingScreen navigation={this.props.navigation}/>
      case TABS.books.key:
        return <BooksScreen/>
      case TABS.alerts.key:
        return <AlertScreen/>
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.canvas,
  },
  tabbar: {
    marginHorizontal: 8,
    backgroundColor: DarkTheme.canvas,
  },
  indicator: {
    backgroundColor: DarkTheme.cardBackground,
    height: "100%",
    borderRadius: 3,
  },
  label: {
    color: DarkTheme.valueText,
    fontFamily: 'DINPro',
    fontSize: 12,
  },
});
