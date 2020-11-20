import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Item from "../components/Item"
import ScannerScreen from "./ScannerScreen"
import DrawerButton from "./DrawerButton"

const ScannerStack = createStackNavigator();



function ScannerStackScreen({ navigation }: any) {
    return(
        <ScannerStack.Navigator>
           <ScannerStack.Screen
  name="Scanner"
  component={ScannerScreen}
  options={({ navigation }) => ({
    title: 'Add product',  headerStyle:{
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
  })}
/>

           
        </ScannerStack.Navigator>
    )
}

export default ScannerStackScreen;