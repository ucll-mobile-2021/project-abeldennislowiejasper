import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Item from "../components/Item";
import ItemScreen from "../screens/ItemScreen";
import { State } from 'react-native-gesture-handler';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';

let soep = new Item(1234, "Soep", "a", ["lalala"], "idk.com");
let kaka = new Item(4321, "kaka", "d", ["lalala"], "idk.com");

let items = [soep, kaka];

class Stash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nr: items.length
    }
  }

  render() {
    setTimeout(() => {
      this.setState({ nr: items.length })
    }, 1000)
    return (
      <View style={styles.view}>
        <FlatList style={styles.flatlist} key={items.length} data={items} extraData={this.state} keyExtractor={item => item.barcode + ""} renderItem={({ item }) => <Text style={[{ fontSize: 25 }]}  onPress={()=>this.props.navigation.navigate('ItemScreen', item)}>{item.name}</Text>} />
        {/* { items.map((item, key)=>(
         <Text key={key} style={({fontSize:25})} onPress={()=>navigation.navigate('ItemScreen', item)}> { item.name } </Text>)
         )} */}
      </View> 
    );
  }

}

export function getItemsLength() {
  return items.length;
}

export function updateItems(item: Item) {
  items.push(item);
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