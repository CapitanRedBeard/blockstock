import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from "react-redux"

import { FontAwesome } from '@expo/vector-icons';

import DarkTheme from '../../constants/DarkTheme'
import { removeAsset } from '../../actions/portfolio'

class RemoveButton extends React.Component {
  _removeItem = () => {
    const { symbol, goBack, removeAsset } = this.props
    removeAsset(symbol)
    goBack()
  }

  render() {
    const { symbol } = this.props
    if(!symbol) {
      return null
    }
    return (
      <TouchableOpacity
        key="RemoveContainer"
        style={styles.removeContainer}
        onPress={this._removeItem}
      >
        <FontAwesome
          name={"trash-o"}
          size={28}
          style={styles.icon}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 18,
    color: DarkTheme.valueText,
  },
})

export default connect(
  null,
  {
    removeAsset
  }
)(RemoveButton)
