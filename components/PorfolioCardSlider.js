
import React, { PureComponent } from 'react';
import {
  Animated,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';


const COLORS = {
  'Abbey Road': "red",
  'Bat Out of Hell': "orange",
  'Number of the Beast': "yellow",
  "It's Blitz": "green",
  'The Man-Machine': "blue",
  'The Score': "purple",
  'Lost Horizons': "red",
};

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class CoverflowExample extends PureComponent {
  static title = 'Coverflow';
  static appbarElevation = 0;

  state = {
    index: 2,
    routes: Object.keys(COLORS).map(key => ({ key })),
  };

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
    this.setState({
      index,
    });
  };

  _renderScene = props => {
    return (
      <Animated.View style={[styles.page, this._buildCoverFlowStyle(props)]}>
        <View style={[styles.album, {backgroundColor:COLORS[props.route.key]}]}/>
      </Animated.View>
    );
  };

  _renderPager = props => {
    return <TabViewPagerPan {...props} />;
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
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
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  album: {
    backgroundColor: '#000',
    width: initialLayout.width - 50,
    height: 200,
    elevation: 12,
    borderRadius: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },
  },
  label: {
    margin: 16,
    color: '#fff',
  },
});
