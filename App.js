/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/Login/Login'

export default class App extends Component {
  render() {
    return <RootStack/>
  }
}

const RootStack = createStackNavigator({
  Login: LoginScreen,
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})
