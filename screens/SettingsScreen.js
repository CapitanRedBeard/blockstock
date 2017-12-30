import React from 'react';
import { View, ScrollView, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { connect } from "react-redux"
import { Ionicons } from '@expo/vector-icons';

import DarkTheme from "../constants/DarkTheme"
import BaseText from '../components/BaseText'
import { toggleTheme } from '../actions/settings'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Settings',
    ...DarkTheme.navigationOptions
  };

  toggleTheme = () => {
    this.props.toggleTheme()
  }

  render() {
    const { darkTheme } = this.props
    return (
      <ScrollView style={styles.container}>
        {
          // <View key="theme" style={styles.row}>
          //   <BaseText style={styles.label}>
          //     {"Dark Theme"}
          //   </BaseText>
              
          //   <Switch onTintColor={DarkTheme.tintColor} value={darkTheme} onValueChange={this.toggleTheme}/>
          // </View>
        }
        <View key="donate" style={styles.donateContainer}>
          <BaseText style={styles.label}>
            {"Donate (ETH Address)"}
          </BaseText>
          <Image
            style={{width: 200, height: 200}}
            source={require('../assets/images/ethDonationQR.png')}
          />
        </View>
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
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: DarkTheme.labelText
  },
  label: {
    color: DarkTheme.labelText,
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    marginBottom: 20,
  },
  donateContainer: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default connect(
  ({settings}) => ({
    darkTheme: settings.darkTheme,
  }),
  {
    toggleTheme,
  }
)(SettingsScreen)