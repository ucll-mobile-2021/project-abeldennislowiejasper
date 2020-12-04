import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"
import ItemScreen from "./ItemScreen"
import StatsScreen from "./StatsScreen"
import DrawerButton from "./DrawerButton"
const StatsStack = createStackNavigator();

//pas options.title aan naar itemnaam door route params mee te geven
function StatsStackScreen() {
    return (
      <StatsStack.Navigator>
       <StatsStack.Screen name="Stats" component={StatsScreen} options={({ navigation }) => ({
    title: 'My stats',  headerStyle:{
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
       <StatsStack.Screen name="ItemScreen" component={ItemScreen} options={({ route }) => ({ title: route.params.name, headerStyle:{
            backgroundColor: '#9ED2CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#3D5250'
          },  })}/>
      </StatsStack.Navigator>
     );
   }

  export default StatsStackScreen;
 