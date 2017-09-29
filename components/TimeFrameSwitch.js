import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BaseText from './BaseText'
import DarkTheme from '../constants/DarkTheme'
import Colors from '../constants/Colors'
import { TimeFrames } from '../constants/Types'

export default function TimeFrameSwitch({selected , onPress}) {
  console.log("TimeFrames", selected)
  return (
    <View style={styles.container} >
      {
        TimeFrames.map((val, i) => {
          const containerStyle = [styles.valueContainer]
          const valueStyle = [styles.value]
          if(i === selected) {
            valueStyle.push(styles.valueSelected)
            containerStyle.push(styles.valueContainerSelected)
          }

          return (
            <TouchableOpacity
              key={val.label}
              style={containerStyle}
              onPress={() => onPress(i)}
              >
              <BaseText style={valueStyle}>
                {val.label}
              </BaseText>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginVertical: 10,
    flexDirection: "row",
  },
  valueContainer: {
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginHorizontal: 5,
    backgroundColor: "transparent"
  },
  value: {
    fontSize: 12,
    color: DarkTheme.labelText,
  },
  valueContainerSelected: {
    backgroundColor: DarkTheme.cardBackground
  },
  valueSelected: {
    color: Colors.tintColor,
  }
})
