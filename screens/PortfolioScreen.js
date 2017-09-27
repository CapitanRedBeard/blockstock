import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import DarkTheme from "../constants/DarkTheme"

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Portfolio',
    ...DarkTheme.navigationOptions
  };

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
});
