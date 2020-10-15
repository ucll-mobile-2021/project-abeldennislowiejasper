import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"
import ItemScreen from "./ItemScreen"
import StashScreen from "./StashScreen"

const StashStack = createStackNavigator();

//pas options.title aan naar itemnaam door route params mee te geven
function StashStackScreen() {textAlign: ''
    return (
      <StashStack.Navigator>
       <StashStack.Screen name="Stash" component={StashScreen} options={{ title: 'My Stash', headerStyle:{
            backgroundColor: '#32bcdf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold', textAlign: 'center'
          }, }}/> 
       <StashStack.Screen name="ItemScreen" component={ItemScreen} options={({ route }) => ({ title: route.params.name, headerStyle:{
            backgroundColor: '#32bcdf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },  })}/>
      </StashStack.Navigator>
     );
   }

  export default StashStackScreen;
 