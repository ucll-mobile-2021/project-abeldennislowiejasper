import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {
    PieChart, StackedBarChart, LineChart
  } from 'react-native-chart-kit';
import Database from '../components/Database';

let refresh = false;
let db = new Database();
let lijst = db.getAllProducts();


class StatsScreen extends Component {

    constructor(props: any) {
      super(props);
      this.state = {
        
      }
    }
  
    onRefresh() {
      refresh = true;
      lijst = db.getAllProducts()
      refresh = false;
    }
  
    render() {
      setTimeout(() => {
        
        
      }, 1000)
      return (
        <View style={styles.container}>
          
        </View>
      );
    }
  
  }

  const styles = StyleSheet.create({
    container: {},
  });

  export default StatsScreen;