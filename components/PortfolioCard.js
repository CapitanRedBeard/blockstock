import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

import DarkTheme from '../constants/DarkTheme'
import { getInTheBlackOrRedColor } from '../constants/Colors'

import BaseText from '../components/BaseText'

const cardWidth = Dimensions.get('window').width - 50

export default class PortfolioCard extends React.PureComponent {
  _onPress = () => {
  };

  render() {
     const { currentPortfolio } = this.props

     return (
       <LinearGradient
          style={styles.touchableWrapper}
          colors={['#9c44f9', '#726ef8', '#4fcef9']}
        >
         <TouchableOpacity style={styles.touchableWrapper} onPress={this._onPress}>
           <View style={styles.container}>
             <BaseText style={styles.portfolioName}>{currentPortfolio.name}</BaseText>
           </View>
         </TouchableOpacity>
       </LinearGradient>
     );
  }
}

const styles = StyleSheet.create({
  touchableWrapper: {
    flex: 1,
    alignSelf: "center",
    width: 300,
    height: 200
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
