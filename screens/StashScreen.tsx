import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Item from "../components/Item"
import ItemScreen from "../screens/ItemScreen"

var soep = new Item(1234, "Soep", "a", "lalala");
var kaka = new Item(4321, "kaka", "d", "ladieda");

var items = [soep, kaka];

function Stash({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Stash Screen</Text>

      { items.map((item, key)=>(
         <Text key={key} style={({fontSize:25})} onPress={()=>navigation.navigate('ItemScreen', item)}> { item.name } </Text>)
         )}
    </View>
  );
}

export default Stash;