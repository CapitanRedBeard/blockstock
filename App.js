import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { FontAwesome, Ionicons, createIconSet } from '@expo/vector-icons';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'

import DarkTheme from './constants/DarkTheme'
import configureStore from './configureStore'
import RootNavigation from './navigation/RootNavigation';

const store = configureStore()
persistStore(store, {storage: AsyncStorage})

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle={DarkTheme.statusBarStyle} />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <Provider store={store}>
            <RootNavigation />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/ethDonationQR.png'),
      ]),
      Font.loadAsync([
        // This is the font that we are using for our tab bar
        FontAwesome.font,
        Ionicons.font,
        { CryptoSymbols: require(`cryptocoins-icons/webfont/cryptocoins.ttf`) },
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        { 'DINPro': require('./assets/fonts/DINPro-Regular.ttf') },
      ]),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
