import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Item from "../components/Item"
import HomeScreen from "./HomeScreen"
import StatsStackScreen from "./StatsStackScreen"
import HelpStackScreen from "./HelpStackScreen"
import ListStackScreen from "./ListStackScreen"
import ItemScreen from "./ItemScreen"
import DrawerButton from "./DrawerButton"

const HomeStack = createStackNavigator();



function HomeStackScreen({ navigation }: any) {
    return(
        <HomeStack.Navigator>


           <HomeStack.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({
    title: 'Home',  headerStyle:{
      backgroundColor: '#9ED2CE',
    },
    headerTintColor: '#fff',
    
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#3D5250',
    },  
    headerLeft: () => (
        <DrawerButton navigation={navigation} />
    ),
  })}
/>

<HomeStack.Screen
  name="StatsStack"
  component={StatsStackScreen}
  options={({ navigation }) => ({
    title: 'Statistics',  headerStyle:{
      backgroundColor: '#9ED2CE',
    },
    headerTintColor: '#fff',
    
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#3D5250',
    },
  })}
/>

<HomeStack.Screen
  name="HelpStack"
  component={HelpStackScreen}
  options={({ navigation }) => ({
    title: 'Help',  headerStyle:{
      backgroundColor: '#9ED2CE',
    },
    headerTintColor: '#fff',
    
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#3D5250',
    },
  })}
/>

<HomeStack.Screen
  name="ListStack"
  component={ListStackScreen}
  options={({ navigation }) => ({
    title: 'Shopping List',  headerStyle:{
      backgroundColor: '#9ED2CE',
    },
    headerTintColor: '#fff',
    
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#3D5250',
    },
  })}
/>

<HomeStack.Screen name="ItemScreen" component={ItemScreen} options={({ route }) => ({ title: route.params.name, headerStyle:{
            backgroundColor: '#9ED2CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#3D5250'
          },  })}/>

        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;