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
        <Text>Home Screen</Text>

        <Text> {name}</Text>
        <Text> {nutriScore}</Text>
        <Text> {barcode}</Text>
        <Text> {IMGurl}</Text>
    
      </View>
    );
  }

  export default ItemScreen;