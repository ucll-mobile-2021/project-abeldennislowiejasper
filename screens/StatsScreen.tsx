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

const data_pie = [
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

const data_bar = {
  labels: ["Sugar / 100g", "Fat / 100g", "Sodium / 100g", "Proteins / 100g"],
  datasets: [
    {
      data: [Math.round(db.getTotalSugar()), Math.round(db.getTotalFat()), Math.round(db.getTotalSodium()), Math.round(db.getTotalProteins())]
    }
  ]
};

for (let [key,value] of db.mapExpirations().entries()){
  const commitsData = [
    { date: key, count: value }
  ];
}

const commitsData = [
  { date: "2020-12-02", count: 1 },
  { date: "2020-12-03", count: 2 },
  { date: "2020-12-04", count: 3 },
  { date: "2020-12-05", count: 4 },
  { date: "2020-12-06", count: 5 },
  { date: "2020-12-30", count: 2 },
];

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
  backgroundColor: "#FFFFF",
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientTo: "#FFFFFF",
  
};

const chartConfig_contr = {

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
        this.setState({ nr: db.length })
        
      }, 1000)
      return (
        <View style={styles.container}>
          <Text>NutriScore ratio</Text>
          <PieChart
          data={data_pie}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig_pie}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="20"
          absolute
        />
        <Text>Nutrient ratio</Text>

  
 <BarChart
  data={data_bar}
  width={screenWidth}
  height={200}
  yAxisLabel=""
  yAxisSuffix=" gr"
  chartConfig={chartConfig_bar}
  verticalLabelRotation={0}
  showValuesOnTopOfBars={true}
/> 

<ContributionGraph
  values={commitsData}
  endDate={new Date("2021-01-30")}
  numDays={105}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig_contr}
/>

{/* <Button title="map" onPress={() => {console.log(db.mapExpirations())}}>Log</Button> */}

        
        </View>
      );
    }
  
  }

  const styles = StyleSheet.create({
    container: {},
  });

  export default StatsScreen;