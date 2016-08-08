/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ajax              from './helpers/ajaxAdapter.js'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class AmISafe extends Component {
  constructor() {
    super();
    this.state ={
    longitude: 'unknown',
    latitude: 'unknown'
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        var initialPosition = position.coords.longitude;
        var latitudePostiton = position.coords.latitude;
        console.log(initialPosition)
        this.setState({longitude: initialPosition, latitude: latitudePostiton});
      })
    console.log(this.state)
  }
  mine(){
    console.log('hello')
    console.log(this.state)
    // ajax.getPrecinct(4).then(data=>{ console.log(data) })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text onPress={this.mine.bind(this)} style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text>{this.state.longitude}</Text>
        <Text>{this.state.latitude}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AmISafe', () => AmISafe);
