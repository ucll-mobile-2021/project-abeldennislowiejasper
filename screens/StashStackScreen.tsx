import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"
import ItemScreen from "./ItemScreen"
import StashScreen from "./StashScreen"
import DrawerButton from "./DrawerButton"
const StashStack = createStackNavigator();

//pas options.title aan naar itemnaam door route params mee te geven
function StashStackScreen() {
    return (
      <StashStack.Navigator>
       <StashStack.Screen name="Stash" component={StashScreen} options={({ navigation }) => ({
    title: 'My Stash',  headerStyle:{
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
       <StashStack.Screen name="ItemScreen" component={ItemScreen} options={({ route }) => ({ title: route.params.name, headerStyle:{
            backgroundColor: '#9ED2CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#3D5250'
          },  })}/>
      </StashStack.Navigator>
     );
   }

  export default StashStackScreen;
 