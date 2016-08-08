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
  View,
  TabBarIOS,
  MapView,
  TextInput
} from 'react-native';
import { Container, Content, Tabs } from 'native-base';


var  AmISafe = React.createClass({
  title: 'Auto-focus',

  getInitialState: function() {
    return {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
      longitude: 'unknown',
      latitude: 'unknown'
    };
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        var initialPosition = position.coords.longitude;
        var latitudePostiton = position.coords.latitude;
        console.log(initialPosition)
        this.setState({longitude: initialPosition, latitude: latitudePostiton});
      })
    console.log(this.state)
  },
  mine(){
    console.log('hello')
    console.log(this.state)
    // ajax.getPrecinct(4).then(data=>{ console.log(data) })
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View>
      <TextInput style={{margin: 10}}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <MapView
        style={{height: 200, margin: 40}}
        showsUserLocation={true}
        followUserLocation={true}      />
      <View style={{flex: 1, height: 100, backgroundColor: 'green'}}>
      <Text style={styles.welcome}> SAFE</Text>
      </View>
      </View>
    );
  },
  _renderContentTwo: function(){
    return (
      <View style={styles.tabContent}>
      <Text style={styles.tabText} >
        {this.state.longitude} {this.state.latitude}
      </Text>
      </View>
    );
  },
  render: function(){
    return (
      <TabBarIOS
        unselectedTintColor="blue"
        tintColor="white"
        barTintColor="yellow">
        <TabBarIOS.Item
          systemIcon="search"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          systemIcon="contacts"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContentTwo()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
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

  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'black',
    margin: 50,
  },
});

AppRegistry.registerComponent('AmISafe', () => AmISafe);
