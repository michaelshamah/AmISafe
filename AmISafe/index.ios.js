/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Search            from './Search.js'
import styles            from './styles.js'
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
import {Container, Content, Card, CardItem} from 'native-base';


var  AmISafe = React.createClass({
  title: '<ScrollView>',
  description: 'To make content scrollable, wrap it within a <ScrollView> component',

  getInitialState: function() {
    return {
      selectedTab: 'tab1',
      longitude: 'unknown',
      latitude: 'unknown',
      data: ['noting found'],
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
    <Search />
    )
  },
  _renderContentTwo: function(){
  },
  render: function(){
    let list=[]
    let felon
    var here=this
    var _scrollView: ScrollView;
    if (this.state.data !== undefined){
      felon=(
        <Container>
        <Content>
          {here.state.data.map((felony, id)=>{
            return (
              <Card key={id} style={{margin: 5}}>
                <CardItem header>
                  <Text>
                    {felony.offense}
                  </Text>
                </CardItem>
                <CardItem>
                  <Text>{felony.occurrence_month} {felony.occurrence_day}, {felony.occurrence_year}</Text>
                </CardItem>
              </Card>
            )
          })}
        </Content>
      </Container>)
      console.log(this.state.data)
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
          <View>
            {this._renderContent()}
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => { _scrollView.scrollTo({y: 0}); }}>
                <Text>SAVE LOCATION</Text>
              </TouchableOpacity>
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={styles.scrollView}>
                {felon}
              </ScrollView>
            </View>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
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
AppRegistry.registerComponent('AmISafe', () => AmISafe);
