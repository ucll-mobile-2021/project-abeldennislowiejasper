import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"
import ItemScreen from "./ItemScreen"
import StashScreen from "./StashScreen"

var soep = new Item(1234, "Soep", "a", "lalala");
var kaka = new Item(4321, "kaka", "d", "ladieda");
var pipi = new Item(4331, "pipi", "d", "ladieda");

var items = [soep, kaka];
const ScannerStack = createStackNavigator();


//pas options.title aan naar itemnaam door route params mee te geven
function ScannerStackScreen() {textAlign: ''
    return (
      <ScannerStack.Navigator>
       <ScannerStack.Screen name="Stash" component={StashScreen} options={{ title: 'My Stash', headerStyle:{
            backgroundColor: '#32bcdf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold', textAlign: 'center'
          }, }}/> 
       <ScannerStack.Screen name="ItemScreen" component={ItemScreen} options={({ route }) => ({ title: route.params.name, headerStyle:{
            backgroundColor: '#32bcdf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },  })}/>
      </ScannerStack.Navigator>
     );
   }

  export function getItemsLength(){
     return items.length;
  }

  export default ScannerStackScreen;
 