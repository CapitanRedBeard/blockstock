import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import DarkTheme from "../constants/DarkTheme"
import BaseText from '../components/BaseText'
import AddAssetHeaderButton from '../components/Portfolio/AddAssetHeaderButton'
import PortfolioCardSlider from '../components/Portfolio/PortfolioCardSlider'
import PortfolioTickerList from '../components/Portfolio/PortfolioTickerList'

import { switchPortfolio } from '../actions/portfolio';
import { fetchTickers } from '../actions/market';

class PortfolioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Portfolio',
    headerRight: <AddAssetHeaderButton navigate={navigation.navigate}/>,
    ...DarkTheme.navigationOptions
  })

  render() {
    const { portfolioData, switchPortfolio, navigation, tickers } = this.props
    const selectedPortfolio = portfolioData.portfolios[portfolioData.selectedIndex]

    return (
      <View style={styles.container}>
        <PortfolioCardSlider
          portfolioData={portfolioData}
          switchPortfolio={switchPortfolio}
        />
        <PortfolioTickerList
          navigate={navigation.navigate}
          portfolio={selectedPortfolio}
          tickers={tickers}
          fetchTickers={fetchTickers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: DarkTheme.canvas,
  },
  label: {
    fontSize: 14,
    color: DarkTheme.labelText,
  }
});


export default connect(
  state => ({
    portfolioData: state.portfolio,
    tickers: state.market.tickers
  }),
  {
    switchPortfolio,
    fetchTickers
  }
)(PortfolioScreen)
