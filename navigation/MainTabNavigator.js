import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import DarkTheme from '../constants/DarkTheme';

import MarketScreen from '../screens/MarketScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    Market: {
      screen: MarketScreen,
    },
    Portfolio: {
      screen: PortfolioScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Market':
            iconName = 'area-chart';
            break;
          case 'Portfolio':
            iconName = 'pie-chart';
            break;
          case 'Settings':
            iconName = 'cog';
        }
        return (
          <FontAwesome
            name={iconName}
            size={28}
            style={styles.icon}
            color={focused ? DarkTheme.tabSelected : DarkTheme.tabDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: DarkTheme.tabSelected,
      inactiveTintColor: DarkTheme.tabDefault,
      activeBackgroundColor: DarkTheme.tabBackgroundSelected,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: DarkTheme.tabBackground,
      },
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3
  }
})
