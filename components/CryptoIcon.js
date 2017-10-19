import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CryptoGlyphMap } from '../constants/FontCode'
import { CryptoColors } from '../constants/Colors'
import { createIconSet } from '@expo/vector-icons';
import DarkTheme from '../constants/DarkTheme'

const Icon = createIconSet(
  CryptoGlyphMap,
  "CryptoSymbols",
  require(`cryptocoins-icons/webfont/cryptocoins.ttf`),
);

export default function CryptoIcon({symbol, style, size = 18}) {
  const color = CryptoColors[symbol]
  // const Icon = createIconSet(CryptoGlyphMap, require(`cryptocoins-icons/webfont/cryptocoins.ttf`))

  const symbolExist = Boolean(CryptoGlyphMap[symbol])
  if(symbolExist) {
    return <Icon name={symbol} color={color} size={size}/>
  }else {
    return <View
              style={[
                      {
                        backgroundColor: DarkTheme.blankSymbolColor,
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                      },
                      {
                        backgroundColor: color
                      },
                    ]
                  } >
          </View>
  }
}


const styles = StyleSheet.create({
  blank: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
