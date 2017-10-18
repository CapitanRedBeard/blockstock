
import React, { PureComponent } from 'react';
import {
  Animated,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';

import PortfolioCard from './PortfolioCard'
import PortfolioPieChart from './PortfolioPieChart'


const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class PortfolioCardSlider extends PureComponent {
  _buildCoverFlowStyle = ({ layout, position, route, navigationState }) => {
    const { width } = layout;
    const { routes } = navigationState;
    const currentIndex = routes.indexOf(route);
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const translateOutputRange = inputRange.map(i => {
      return width / 3 * (currentIndex - i) * -1;
    });
    const scaleOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1;
      } else {
        return 0.7;
      }
    });
    const opacityOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1;
      } else {
        return 0.3;
      }
    });

    const translateX = position.interpolate({
      inputRange,
      outputRange: translateOutputRange,
    });
    const scale = position.interpolate({
      inputRange,
      outputRange: scaleOutputRange,
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: opacityOutputRange,
    });

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    };
  };

  _handleIndexChange = index => {
    this.props.switchPortfolio(index)
  };

  _renderScene = props => {
    return (
      <Animated.View style={[styles.page, this._buildCoverFlowStyle(props)]}>
        <PortfolioPieChart portfolio={props.route} index={props.index} tickers={this.props.tickers}/>
      </Animated.View>
    );
  };

  _renderPager = props => {
    return <TabViewPagerPan {...props} />;
  };

  render() {
    const { selectedIndex, portfolios } = this.props.portfolioData

    const navigationState = {
      index: selectedIndex,
      routes: portfolios,
    }
    return (
      <View style={styles.container}>
        <TabViewAnimated
          navigationState={navigationState}
          renderPager={this._renderPager}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    margin: 16,
    color: '#fff',
  },
});
