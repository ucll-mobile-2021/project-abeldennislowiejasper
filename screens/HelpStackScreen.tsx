import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"
import ItemScreen from "./ItemScreen"
import HelpScreen from "./HelpScreen"
import DrawerButton from "./DrawerButton"
const HelpStack = createStackNavigator();

//pas options.title aan naar itemnaam door route params mee te geven
function HelpStackScreen() {
    return (
      <HelpStack.Navigator>
       <HelpStack.Screen name="Help" component={HelpScreen} options={({ navigation }) => ({
    title: 'Help',  headerStyle:{
      backgroundColor: '#9ED2CE',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#3D5250'
    },  
    headerLeft: () => (
        <DrawerButton navigation={navigation} />
    ),
  })}/> 
       <HelpStack.Screen name="HelpScreen" component={HelpScreen} options={({ route }) => ({ title: route.params.name, headerStyle:{
            backgroundColor: '#9ED2CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#3D5250'
          },  })}/>
      </HelpStack.Navigator>
     );
   }

  export default HelpStackScreen;