import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from 'react-native-notifications';
import {
  PieChart
} from "react-native-chart-kit";
import Item from '../components/Item';


let soep = new Item(1234, "Soep", "a", ["bla","bli"], "bla", 11.23);
let kaka = new Item(4321, "kaka", "d", ["bla","bli"], "bla", 12.45);

let items = [soep, kaka];

function getTotalPrice(){
  let total = 0;
  items.forEach(element => {
    total += element.price;
});
return total;
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


const data = [
  {
    name: "% Fresh",
    amount: 50,
    color: "#93C4C0",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "% Spoils soon",
    amount: 30,
    color: '#779E9B',
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "% Spoiled",
    amount: 20,
    color: "#2A3837",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  
];

const chartConfig = {
 
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


const screenWidth = Dimensions.get("window").width;


function Home({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
      {/* <Button
        title="send notification"
        onPress={() => test()}
        color='#8AB8B4'
      /> */}
      <PieChart
        data={data}
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
          <Text style={styles.bli}>€ {getTotalPrice()}</Text>
          <Text style={styles.blu}>wasted this month</Text>
          </View>
        <View style={styles.stattext}>
        <Text style={styles.bli}>{items.length} kg</Text>
          <Text style={styles.blu}>wasted this month</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('STASH')}>
        <Text>Item lijst</Text>
      </TouchableOpacity>
    </View>

  );
}

export default Home;


const styles = StyleSheet.create({
  stattext:{
    padding: 12,
    marginTop: 2,
    marginBottom: 2,
    width: "45%",
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE",
    borderWidth: 2,
    borderRadius: 6,
    alignItems: 'center'
    
  },
  bla:{
    flexDirection: 'row'
  },
  bli:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  blu:{fontSize: 10,color: 'black'},
  box: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE",
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