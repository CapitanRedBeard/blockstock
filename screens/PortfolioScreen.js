import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import DarkTheme from "../constants/DarkTheme"
import BaseText from '../components/BaseText'
import AddCurrencyButton from '../components/AddCurrencyButton'
import PortfolioCardSlider from '../components/PortfolioCardSlider'

import { switchPortfolio } from '../actions/portfolio';

class PortfolioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Portfolio',
    headerRight: <AddCurrencyButton navigate={navigation.navigate}/>,
    ...DarkTheme.navigationOptions
  })

  render() {
    return (
      <View style={styles.container}>
        <PortfolioCardSlider
          portfolioData={this.props.portfolioData}
          switchPortfolio={this.props.switchPortfolio}
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
    portfolioData: state.portfolio
  }),
  {
    switchPortfolio
  }
)(PortfolioScreen)
