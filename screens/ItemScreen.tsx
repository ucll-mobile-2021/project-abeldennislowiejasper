import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"


const Stack = createStackNavigator();
 
function ItemScreen({route, navigation}) {
    console.log(route.params)
    var {name, nutriScore, barcode, IMGurl} = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Information about {name}</Text>

        <Text>Name: {name}</Text>
        <Text>Nutri Score: {nutriScore}</Text>
        <Text>Barcode: {barcode}</Text>
        <Text>IMG URL: {IMGurl}</Text>
    
      </View>
    );
  }

  export default ItemScreen;