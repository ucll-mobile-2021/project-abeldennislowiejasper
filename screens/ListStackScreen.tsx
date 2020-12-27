import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ListScreen from "./ListScreen"
import DrawerButton from "./DrawerButton"
const ListStack = createStackNavigator();

//pas options.title aan naar itemnaam door route params mee te geven
function ListStackScreen() {
    return (
      <ListStack.Navigator>
       <ListStack.Screen name="List" component={ListScreen} options={({ navigation }) => ({
    title: 'List',  headerStyle:{
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
       <ListStack.Screen name="ListScreen" component={ListScreen} options={({ route }) => ({ title: route.params.name, headerStyle:{
            backgroundColor: '#9ED2CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#3D5250'
          },  })}/>
      </ListStack.Navigator>
     );
   }

  export default ListStackScreen;