import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {
    PieChart, BarChart, LineChart
  } from 'react-native-chart-kit';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database';

let refresh = false;
let db = new Database();
let lijst = db.getAllProducts();

const data_pie = [
  {
    name: "A",
    amount: db.getAllProducts().length,
    color: "#93C4C0",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "B",
    amount: db.getAllProducts().length,
    color: '#779E9B',
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "C",
    amount: db.getAllProducts().length,
    color: "#2A3837",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "D",
    amount: db.getAllProducts().length,
    color: "#2A3837",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "E",
    amount: db.getAllProducts().length,
    color: "#2A3837",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },

];

const data_bar = {
  labels: ["Sugar/100g", "Fat/100g", "Sodium/100g", "Proteins/100g"],
  datasets: [
    {
      data: [db.getTotalSugar(), db.getTotalFat(), db.getTotalSodium(), db.getTotalProteins()]
    }
  ]
};

const chartConfig_pie = {

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const chartConfig_bar = {

  color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  backgroundColor: "#FFFFF",
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientTo: "#FFFFFF",
  
};


const screenWidth = Dimensions.get("window").width;

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
          <PieChart
          data={data_pie}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig_pie}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
{
 <BarChart
  data={data_bar}
  width={screenWidth}
  height={200}
  yAxisLabel=""
  yAxisSuffix=""
  chartConfig={chartConfig_bar}
  verticalLabelRotation={0}
/> 
}
        
        </View>
      );
    }
  
  }

  const styles = StyleSheet.create({
    container: {},
  });

  export default StatsScreen;