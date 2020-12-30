import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {
    PieChart, BarChart, ContributionGraph
  } from 'react-native-chart-kit';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database';

let refresh = false;
let db = new Database();
let lijst = db.getAllProducts();

function getDataPie() {
  return [
    {
      name: "A",
      amount: db.getNutriScoreAmount('a'),
      color: "#12FA83",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "B",
      amount: db.getNutriScoreAmount('b'),
      color: '#B7FA54',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "C",
      amount: db.getNutriScoreAmount('c'),
      color: "#FAED01",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "D",
      amount: db.getNutriScoreAmount('d'),
      color: "#FA7C2C",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "E",
      amount: db.getNutriScoreAmount('e'),
      color: "#FA2929",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  
  ];
}

function getDataBar(){
  return {
    labels: ["Sugar / 100g", "Fat / 100g", "Sodium / 100g", "Proteins / 100g"],
    datasets: [
      {
        data: [Math.round(db.getTotalSugar()), Math.round(db.getTotalFat()), Math.round(db.getTotalSodium()), Math.round(db.getTotalProteins())]
      }
    ]
  };
}

function getCommitsData(){
  let commitsData : any = [];
  for (let [key,value] of db.mapExpirations().entries()){
    commitsData.push({ date: key, count: value })
  }
  return commitsData
}

const chartConfig_pie = {

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const chartConfig_bar = {

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  backgroundColor: "#FFFFFF",
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientTo: "#FFFFFF",
  
};

const chartConfig_contr = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  backgroundColor: "#000000",
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientTo: "#FFFFFF",
  
};

const screenWidth = Dimensions.get("window").width;

class StatsScreen extends Component {

    constructor(props: any) {
      super(props);
      this.state = {
        nr: db.length,
        dataPie: getDataPie(),
        dataBar: getDataBar(),
        commitsData: getCommitsData(),
        refreshing: refresh
      }
    }
  
    onRefresh() {
      refresh = true;
      lijst = db.getAllProducts()
      refresh = false;
    }
  
    render() {
      setTimeout(() => {
        this.setState({ nr: db.length,
          dataPie: getDataPie(),
          dataBar: getDataBar(),
          commitsData: getCommitsData()
         })
        
      }, 500)
      return (
        <View style={styles.container}>
          <View style={styles.title}>
          <Text style={styles.title}>NutriScore ratio</Text>
          </View>
          <PieChart
          data={this.state.dataPie}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig_pie}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="20"
          absolute
        />
        <View style={styles.title}>
        <Text style={styles.title}>Nutrient ratio</Text></View>

  
 <BarChart
  data={this.state.dataBar}
  width={screenWidth}
  height={200}
  yAxisLabel=""
  yAxisSuffix=" gr"
  chartConfig={chartConfig_bar}
  verticalLabelRotation={0}
  showValuesOnTopOfBars={true}
/> 
<View style={styles.title}><Text style={styles.title}>Expiration dates</Text></View>
 <ContributionGraph
  values={this.state.commitsData}
  endDate={new Date("2021-01-30")}
  numDays={105}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig_contr}
  
/> 

        
        </View>
      );
    }
  
  }

  const styles = StyleSheet.create({
    container: {
      
    },
    title: {
      
      alignItems: 'center',
      fontSize: 20
      
    }
  });

  export default StatsScreen;