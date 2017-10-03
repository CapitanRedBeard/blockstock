import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import DarkTheme from "../constants/DarkTheme"
import BaseText from '../components/BaseText'
import AddCurrencyButton from '../components/AddCurrencyButton'

export default class PortfolioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Portfolio',
    headerRight: <AddCurrencyButton navigate={navigation.navigate}/>,
    ...DarkTheme.navigationOptions
  })

  render() {
    return (
      <ScrollView style={styles.container}>

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
