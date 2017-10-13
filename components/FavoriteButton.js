import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../constants/DarkTheme'
import { favoriteCurrency } from '../actions/market'

class FavoriteButton extends React.Component {

  render() {
    const { symbol, favorites } = this.props
    if(!symbol) {
      return null
    }

    const favorited = Boolean(favorites[symbol])
    const iconName = favorited ? "heart" : "heart-o"

    return (
      <TouchableOpacity
        key="FavoriteContainer"
        style={styles.favoriteContainer}
        onPress={() => this.props.favoriteCurrency(symbol)}
      >
        <FontAwesome
          name={iconName}
          size={28}
          style={styles.icon}
          color={favorited ? DarkTheme.favorited : DarkTheme.notFavorited}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  favoriteContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // flex: 1,
  },
  icon: {
    fontSize: 18,
    color: DarkTheme.valueText,
  },
})

export default connect(
  state => ({
    favorites: state.market.favorites
  }),
  {
    favoriteCurrency
  }
)(FavoriteButton)
