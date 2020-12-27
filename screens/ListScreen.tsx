import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {
    PieChart, BarChart, ContributionGraph
  } from 'react-native-chart-kit';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database';
import Item from '../components/Item';

const db = new Database();
let lijstBoodschappen : Array<Item>;
let refresh = false;

function getLijstBoodschappen() {
  lijstBoodschappen = db.getLijstBoodschappen();
  return lijstBoodschappen;
}

class ListScreen extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      nr: db.length,
      refreshing: refresh
    }
  }

  onRefresh() {
    refresh = true;
    getLijstBoodschappen();
    
    refresh = false;
  }

  render() {
    setTimeout(() => {
      this.setState({ nr: db.length })
      getLijstBoodschappen();
      this.onRefresh();
      console.log('refreshed')
    }, 1000)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {},
  });

  export default ListScreen;