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
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ListView
} from 'react-native';
import { Container, Content, Tabs } from 'native-base';


var  AmISafe = React.createClass({
  title: '<ScrollView>',
  description: 'To make content scrollable, wrap it within a <ScrollView> component',

  getInitialState: function() {
    return {
      selectedTab: 'tab1',
      longitude: 'unknown',
      latitude: 'unknown',
      data: ['noting found']
    };
  },
  componentDidMount: function() {
    let here=this
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position.coords.longitude;
        var latitudePostiton = position.coords.latitude;

        this.setState({longitude: initialPosition, latitude: latitudePostiton});

        ajax.getPrecinct(initialPosition, latitudePostiton).then(data=>{
          lastfive=[]
          for (var i= data.length-1; (i> data.length-6 || i< 0); i--){
            lastfive.push(data[i])
          }
          here.setState({data: lastfive})
       })
      }
    )
  },
  mine(){
    console.log(this.state)
  },

  _renderContent: function() {
    return (
      <View style={{marginTop: 25}}>
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
    let list=[]
    var _scrollView: ScrollView;
    if (this.state.data !== undefined){
      this.state.data.forEach(function(place){
        list.push(place.offense)
      })
      console.log(this.state)
    } else{
      list=['no data found']
      console.log(list)
    }

    return (
      <TabBarIOS
        unselectedTintColor="blue"
        tintColor="white"
        barTintColor="red">
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'tab1'}
          onPress={() => {
            this.setState({
              selectedTab: 'tab1',
            });
            console.log(this.state)
          }}>
          <ScrollView>
          <View>
            {this._renderContent()}
            <View>
            <ScrollView
              ref={(scrollView) => { _scrollView = scrollView; }}
              automaticallyAdjustContentInsets={false}
              onScroll={() => { console.log('onScroll!'); }}
              scrollEventThrottle={200}
              style={styles.scrollView}>
              <ListView
                dataSource={this.state.data}
                renderRow={(rowData) => <Text> {rowData} </Text>}
              />
            </ScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { _scrollView.scrollTo({y: 0}); }}>
              <Text>Scroll to top</Text>
            </TouchableOpacity>
          </View>
          </View>
          </ScrollView>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          systemIcon="contacts"
          selected={this.state.selectedTab === 'tab2'}
          onPress={() => {
            this.setState({
              selectedTab: 'tab2',
            });
            console.log(this.state)
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
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
});


AppRegistry.registerComponent('AmISafe', () => AmISafe);
