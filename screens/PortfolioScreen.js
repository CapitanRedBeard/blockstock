import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import DarkTheme from "../constants/DarkTheme"
import BaseText from '../components/BaseText'
import AddAssetHeaderButton from '../components/Portfolio/AddAssetHeaderButton'
import PortfolioCardSlider from '../components/Portfolio/PortfolioCardSlider'
import PortfolioTickerList from '../components/Portfolio/PortfolioTickerList'
import PortfolioPieChart from '../components/Portfolio/PortfolioPieChart'
import AddAssetButton from '../components/Portfolio/AddAssetButton'

import { switchPortfolio } from '../actions/portfolio';
import { fetchTickers } from '../actions/market';

class PortfolioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Portfolio',
    ...DarkTheme.navigationOptions
  })

  render() {
    const { portfolioData, switchPortfolio, navigation, tickers } = this.props
    const selectedPortfolio = portfolioData.portfolios[portfolioData.selectedIndex]
    const assetsExist = Boolean(Object.keys(selectedPortfolio.assets).length)

    return (
      <View style={styles.container}>
        <PortfolioCardSlider
          portfolioData={portfolioData}
          switchPortfolio={switchPortfolio}
          tickers={tickers}
        />
        {
          assetsExist ?
          <PortfolioTickerList
            navigate={navigation.navigate}
            portfolio={selectedPortfolio}
            tickers={tickers}
            fetchTickers={fetchTickers}
          /> :
          <View style={styles.noDataContainer}>
            <View style={styles.noDataWrapper}>
              <BaseText style={styles.noDataMessage}>
                {"Add an asset to start this portfolio"}
              </BaseText>
              <AddAssetButton navigate={navigation.navigate} />
            </View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.canvas,
  },
  label: {
    fontSize: 14,
    color: DarkTheme.labelText,
  },
  noDataContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  noDataWrapper: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataMessage: {
    marginBottom: 20,
    color: DarkTheme.valueText,
    fontSize: 24,
    textAlign: "center"
  },
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
