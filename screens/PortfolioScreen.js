import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import DarkTheme from "../constants/DarkTheme"
import BaseText from '../components/BaseText'
import AddCurrencyButton from '../components/AddCurrencyButton'
import PortfolioCard from '../components/PortfolioCard'

class PortfolioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Portfolio',
    headerRight: <AddCurrencyButton navigate={navigation.navigate}/>,
    ...DarkTheme.navigationOptions
  })

  render() {
    const {portfolios, currentPortfolio} = this.props.portfolioData
    return (
      <ScrollView style={styles.container}>
        <PortfolioCard currentPortfolio={portfolios[currentPortfolio]}/>
      </ScrollView>
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
)(PortfolioScreen)
