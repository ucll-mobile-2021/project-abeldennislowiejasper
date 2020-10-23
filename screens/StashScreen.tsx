import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Item from "../components/Item";
import ItemScreen from "../screens/ItemScreen";
import { State } from 'react-native-gesture-handler';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database'

let soep = new Item(1234, "Soep", "a", ["lalala"], "idk.com");
let kaka = new Item(4321, "kaka", "d", ["lalala"], "idk.com");



let db = new Database();

let refresh = false;

class Stash extends Component {

  lijst = db.results;

  constructor(props) {
    super(props);
    this.state = {
      nr: db.length,
      refreshing: refresh
    }
  }

  onRefresh(){
    refresh = true;
    this.lijst = db.getAllProducts()
    refresh = false;
  }

  render() {
    setTimeout(() => {
      console.log("4")
    }, 1000)
    return (
      <View style={styles.view}>
        <FlatList style={styles.flatlist} refreshing={this.state.refreshing} onRefresh={this.onRefresh} data={this.lijst} extraData={this.state} keyExtractor={item => item.barcode + ""} renderItem={({ item }) => <Text style={[{ fontSize: 25 }]}  onPress={()=>this.props.navigation.navigate('ItemScreen', item)}>{item.name}</Text>} />
        {/* { items.map((item, key)=>(
         <Text key={key} style={({fontSize:25})} onPress={()=>navigation.navigate('ItemScreen', item)}> { item.name } </Text>)
         )} */}
      </View> 
    );
  }

}




// function Stash({navigation}) {

//     let lijst = db.getAllProducts();
//     let nr = db.getItemsCount();
    
//     setTimeout(() => {
//       lijst = db.getAllProducts();
//       console.log("RELOAD")
//     }, 1000)

//     console.log(lijst)
//     return (
//       <View style={styles.view}>
//         <FlatList style={styles.flatlist} onRefresh={db.getAllProducts} key={lijst.length} data={lijst} extraData={db.length} keyExtractor={item => item.barcode + ""} renderItem={({ item }) => <Text style={[{ fontSize: 25 }]}  onPress={()=>navigation.navigate('ItemScreen', item)}>{item.name}</Text>} />
//         {/* { items.map((item, key)=>(
//          <Text key={key} style={({fontSize:25})} onPress={()=>navigation.navigate('ItemScreen', item)}> { item.name } </Text>)
//          )} */}
//       </View> 
//     );
  

// }


export function updateItems(item: Item) {
  db.addProduct(item);
}

export default Stash;

const styles = StyleSheet.create({
  view: {
    alignItems: 'flex-start', 
    justifyContent: 'center',
    flex: 1,
  },
  flatlist: {
    padding: 15,
  },
});