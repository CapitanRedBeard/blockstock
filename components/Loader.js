import React from 'react';
import { ActivityIndicator } from 'react-native';

import DarkTheme from '../constants/DarkTheme'

export default function Loader(props) {
  return (
    <ActivityIndicator
      color={DarkTheme.loaderColor}
      size={"large"}
      {...props}
    />
  );
}
