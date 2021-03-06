import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from 'react-native-notifications';
import {
  PieChart
} from "react-native-chart-kit";
import Item from '../components/Item';
import Database from '../components/Database';

import { getAll } from './StashScreen';
import { totalmem } from 'os';
import { List } from 'realm';

const db = new Database();
let lijstBijnaVervallen : Array<Item>;
let refresh = false;


function getLijstBijnaVervallen() {
  lijstBijnaVervallen = db.getLijstBijnaVervallen();
  return lijstBijnaVervallen;
}

export function getTotalPrice() {
  let totalPrice = 0;
  let date = new Date();
  db.getLijstVervallen().forEach(element => {
    totalPrice += element.price;
  });

  return Math.round((totalPrice * 100)) / 100;
}

export function getTotalWeight(){
  let total = 0;
  db.getLijstVervallen().forEach(element => {
    total += element.product_quantity;
}); 
 
  return total;
}

let code : any; 
function ifLijst() {
  if(getLijstBijnaVervallen().length == 0) {
     code = <Text>Nothing spoils soon</Text>
  } else { return null;}
  return code;
  
}





function test() {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
    // TODO: Send the token to my server so it could send back push notifications...
    console.log("Device Token Received", event.deviceToken);
  });
  Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
    console.error(event);
  });
}

function getData(){
  return [
    {
      name: "Fresh",
      amount: db.getLijstVers().length,
      color: "#93C4C0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Spoils soon",
      amount: db.getLijstBijnaVervallen().length,
      color: '#779E9B',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Spoiled",
      amount: db.getLijstVervallen().length,
      color: "#2A3837",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  
  ];
}

const chartConfig = {

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


const screenWidth = Dimensions.get("window").width;


class Home extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      nr: db.length,
      moneyWasted: getTotalPrice(),
      weightWasted: getTotalWeight(),
      pieChartData: getData(),
      refreshing: refresh
    }
  }

  onRefresh() {
    refresh = true;
    getTotalPrice();
    db.getLijstVers();
    getLijstBijnaVervallen();
    db.getLijstBijnaVervallen();
    db.getLijstVervallen();
    ifLijst();
    getTotalWeight()
    refresh = false;
  }

  render() {
    setTimeout(() => {
      this.setState({ nr: db.length,
        moneyWasted: getTotalPrice(),
        weightWasted: getTotalWeight(),
        pieChartData: getData()
       })
      getTotalPrice();
      getTotalWeight();
      db.getLijstBijnaVervallen();
    db.getLijstVervallen();
      getLijstBijnaVervallen();
      db.getLijstVers();
      ifLijst();
      this.onRefresh();
    }, 1000)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        {/* <Button
      title="send notification"
      onPress={() => test()}
      color='#8AB8B4'
    /> */}
        <PieChart
          data={this.state.pieChartData}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
        <View style={styles.bla}>
          <View style={styles.stattext}>
            <Text style={styles.bli}>€ {this.state.moneyWasted}</Text>
            <Text style={styles.blu}>wasted</Text>
          </View>
          <View style={styles.stattext}>
            <Text style={styles.bli}>{ this.state.weightWasted/1000} kg</Text>
            <Text style={styles.blu}>wasted</Text>
          </View>
        </View>
        <Text style={styles.headerBox}>Spoils soon:</Text>
        <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate('STASH')}>
        {ifLijst()}
        <FlatList  data={getLijstBijnaVervallen()} extraData={this.state}
          keyExtractor={item => item.barcode + ""}
          renderItem={
            ({ item }) =>
            <TouchableOpacity style={styles.item}  onPress={() => this.props.navigation.navigate('ItemScreen', {
              name: item.name, 
              barcode: item.barcode,
              nutriscore: item.nutriscore,
              allergene: item.allergene,
              IMGurl: item.IMGurl,
              price: item.price,
              expiration_date: (item.expiration_date).getTime()/ 1000,
              energy_kcal_value: item.energy_kcal_value,
              proteins_100g: item.proteins_100g,
              sugars_100g: item.sugars_100g,
              sodium_100g: item.sodium_100g,
              fat_100g: item.fat_100g,
              product_quantity: item.product_quantity})}>
                <View style={styles.imageView}>
                <Image   resizeMode="cover" style={styles.image} source={item.IMGurl ? { uri: item.IMGurl } : { uri:"https://pdsohio.com/wp-content/uploads/2017/04/default-image.jpg"}}  />
                </View>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.arrow}>{'→'}</Text>

              </TouchableOpacity>             
          }
        />
        
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;


const styles = StyleSheet.create({
  stattext: {
    padding: 12,
    marginTop: 2,
    marginBottom: 2,
    width: "45%",
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE",
    borderWidth: 2,
    borderRadius: 6
  },
  headerBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20
  },
  item: {
    marginTop: 15,
    //paddingTop: 25,
    backgroundColor: "#80ABA7", //#9ED2CE
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "99%",
    borderRadius: 12,
    marginLeft: "0%",
  },
  itemText: {
    fontSize: 25,
    width: "60%",
    alignSelf: "center",
    paddingLeft: 15,
  },
  imageView: {
    width: "25%",
    height: "100%",
    //backgroundColor: "red"
  },
  image: {
    width: 45,
    height: 45,
    alignSelf: "center"
  },
  arrow: {
    width: "15%",
    fontSize: 20,
  },
  bla: {
    flexDirection: 'row'
  },
  bli: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  blu: { fontSize: 10, color: 'black' },
  box: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE", //#779E9B
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 15,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },
});