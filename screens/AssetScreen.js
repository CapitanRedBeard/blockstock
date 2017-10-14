import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import CurrencyScreen from './CurrencyScreen';
import HoldingScreen from './HoldingScreen';
import AlertScreen from './AlertScreen';
import BooksScreen from './BooksScreen';

import CurrencyHeader from '../components/CurrencyHeader'
import FavoriteButton from '../components/FavoriteButton';
import DarkTheme from "../constants/DarkTheme"

export default class AssetScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: CurrencyHeader(navigation.state.params),
    headerRight: <FavoriteButton symbol={navigation.state.params.symbol}/>,
    ...DarkTheme.navigationOptions
  })

  constructor(props) {
    super(props)
    const stateObj = {
      index: 1,
      routes: [
        { key: '1', title: 'General' },
        { key: '2', title: 'Holding' },
        { key: '3', title: 'Books' },
        { key: '4', title: 'Alerts' },
      ],
    };

    if(props.profileView) {

    }
    this.state = stateObj
  }

  _handleIndexChange = index => {
    this.setState({
      index,
    });
  };

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
      />
    );
  };

  _renderScene = ({ route }) => {
    const {params} = this.props.navigation.state
    switch (route.key) {
      case '1':
        return <CurrencyScreen ticker={params}/>
      case '2':
        return <HoldingScreen/>
      case '3':
        return <BooksScreen/>
      case '4':
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
  tab: {
    width: 90,
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
