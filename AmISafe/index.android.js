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
  mine(){
    console.log('hello')
    // ajax.getPrecinct(4).then(data=>{ console.log(data) })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text onPress={() => console.log('1st')} style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <TouchableHighlight onPress= {this.mine.bind(this)}>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </TouchableHighlight>
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
