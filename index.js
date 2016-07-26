/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Navigator
} from 'react-native';

import MainScreen from './MainScreen';

class Snake extends Component {
  render() {
    var defaultName = 'MainScreen';
    var defaultComponent = MainScreen;
    return (
        <Navigator
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={(route) => {
            return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, pnav) => {
            let Component = route.component;
            return <Component {...route.params} pnav={pnav} />
        }}/>
    );
  }
}
AppRegistry.registerComponent('Snake', () => Snake);
