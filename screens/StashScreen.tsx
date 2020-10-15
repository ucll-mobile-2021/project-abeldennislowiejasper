import React, {Component} from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Item from "../components/Item";
import ItemScreen from "../screens/ItemScreen";
import { State } from 'react-native-gesture-handler';

let soep = new Item(1234, "Soep", "a", "lalala");
let kaka = new Item(4321, "kaka", "d", "ladieda");

let items = [soep, kaka];

class Stash extends Component{
  constructor(props){
    super(props);
    this.state = {
       nr: items.length
    }
  }

  render(){
    setTimeout(() => {
      this.setState({nr: items.length})
    }, 1000)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Stash Screen</Text>
      <FlatList key={items.length} data={items} extraData={this.state} keyExtractor={item=>item.barcode + ""} renderItem={({item}) => <Text style={[{fontSize: 25}]}>{item.name}</Text>}/>
      {/* { items.map((item, key)=>(
         <Text key={key} style={({fontSize:25})} onPress={()=>navigation.navigate('ItemScreen', item)}> { item.name } </Text>)
         )} */}
    </View>
  );}

}

export function getItemsLength(){
  return items.length;
}

export function updateItems(item:Item){
  items.push(item);
}

export default Stash;