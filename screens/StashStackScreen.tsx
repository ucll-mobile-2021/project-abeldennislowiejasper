import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"
import ItemScreen from "./ItemScreen"
import StashScreen from "./StashScreen"

var soep = new Item(1234, "Soep", "a",["idk"] ,"lalala");
var kaka = new Item(4321, "kaka", "d",["idk"] ,"ladieda");

var items = [soep, kaka];
const HomeStack = createStackNavigator();

function ScannerStackScreen() {
    return (
      <HomeStack.Navigator>
       <HomeStack.Screen name="Stash" component={StashScreen} />
       <HomeStack.Screen name="ItemScreen" component={ItemScreen} />
      </HomeStack.Navigator>
     );
   }

  export default ScannerStackScreen;