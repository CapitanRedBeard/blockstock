
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


const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class PortfolioCardSlider extends PureComponent {
  static title = 'Coverflow';
  static appbarElevation = 0;

  constructor(props) {
    super(props)
    const { selectedIndex, portfolios } = props.portfolioData

    this.state = {
      index: selectedIndex,
      routes: portfolios,
    }
  }

  _buildCoverFlowStyle = ({ layout, position, route, navigationState }) => {
    const { width } = layout;
    const { routes } = navigationState;
    const currentIndex = routes.indexOf(route);
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const translateOutputRange = inputRange.map(i => {
      return width / 4 * (currentIndex - i) * -1;
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
    this.setState({
      index,
    });
  };

  _renderScene = props => {
    return (
      <Animated.View style={[styles.page, this._buildCoverFlowStyle(props)]}>
        <PortfolioCard portfolio={props.route} index={props.index}/>
      </Animated.View>
    );
  };

  _renderPager = props => {
    return <TabViewPagerPan {...props} />;
  };

  render() {
    return (
      <TabViewAnimated
        style={this.props.style}
        navigationState={this.state}
        renderPager={this._renderPager}
        renderScene={this._renderScene}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    margin: 16,
    color: '#fff',
  },
});
