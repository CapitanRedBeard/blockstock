import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import DarkTheme from "../constants/DarkTheme"

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Settings',
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
