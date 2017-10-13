import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../constants/DarkTheme'
import { getInTheBlackOrRedColor } from '../constants/Colors'

import BaseText from '../components/BaseText'

const cardWidth = Dimensions.get('window').width - 50;
const COLOR_PROFILES = [
  ['#FF4E50', '#F9D423'],
  ['#93F9B9', '#1D976C'],
  ['#C04848', '#480048'],
  ['#5f2c82', '#49a09d'],
  ['#283048', '#859398']
]

export default class PortfolioCard extends React.PureComponent {
  render() {
     const { portfolio, index } = this.props

     return (
       <LinearGradient
          style={styles.touchableWrapper}
          colors={COLOR_PROFILES[index % COLOR_PROFILES.length]}
        >
         <View style={styles.container}>
           <BaseText style={styles.portfolioName}>{portfolio.name}</BaseText>
         </View>
       </LinearGradient>
     );
  }
}

const styles = StyleSheet.create({
  touchableWrapper: {
    backgroundColor: '#000',
    width: cardWidth,
    height: 200,
    elevation: 12,
    borderRadius: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 3,
  },
  portfolioName: {
    color: DarkTheme.valueText,
    fontSize: 24,
  },
})
