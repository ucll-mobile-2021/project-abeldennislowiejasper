import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StashStackScreen from './screens/StashStackScreen';
import StashScreen, { getDB } from './screens/StashScreen';
import ScannerScreen from './screens/ScannerScreen';
import HomeScreen from './screens/HomeScreen';
import ItemScreen from './screens/ItemScreen';
import HomeStackScreen from './screens/HomeStackScreen';
import ScannerStackScreen from './screens/ScannerStackScreen';
//import { getItemsLength } from './screens/StashScreen';
import { DrawerContent } from './screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Database from './components/Database'
import { getAll } from './screens/StashScreen';
import StatsStackScreen from './screens/StatsStackScreen';
import HelpStackScreen from './screens/HelpStackScreen';
const Drawer = createDrawerNavigator();



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

let uniqueValue = 1

export function forceUpdate(){
  uniqueValue += 1
  console.log("Unique value=" + uniqueValue)
}

function DrawerHomeNavigator() {
  return (
  <Drawer.Navigator hideStatusBar={false} drawerContent={props => <DrawerContent {... props}/> }>
    <Drawer.Screen name="HOME" component={HomeStackScreen} />
  </Drawer.Navigator>
  );
}

function DrawerStashNavigator(){
  return (
    <Drawer.Navigator hideStatusBar={false} drawerContent={props => <DrawerContent {... props}/> }>
      <Drawer.Screen name="STASH" component={StashStackScreen} />
    </Drawer.Navigator>
    );
}

function DrawerScannerNavigator(){
  return (
    <Drawer.Navigator hideStatusBar={false} drawerContent={props => <DrawerContent {... props}/> }>
      <Drawer.Screen name="SCAN" component={ScannerStackScreen} />
    </Drawer.Navigator>
    );
}

function StatsStackNavigator(){
  return (
    <Drawer.Navigator hideStatusBar={false} drawerContent={props => <DrawerContent {... props}/> }>
      <Drawer.Screen name="STATS" component={StatsStackScreen} />
    </Drawer.Navigator>
    );
}

function HelpStackNavigator(){
  return (
    <Drawer.Navigator hideStatusBar={false} drawerContent={props => <DrawerContent {... props}/> }>
      <Drawer.Screen name="HELP" component={HelpStackScreen} />
    </Drawer.Navigator>
    );
}


//TODO herschrijven naar een class
function App() {

  const db = new Database();
  return (
    <NavigationContainer key={uniqueValue}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === 'HOME') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'STASH') {
              iconName = focused ? 'fast-food' : 'fast-food';
            }
            else if (route.name === 'SCAN') {
              iconName = focused ? 'barcode' : 'barcode';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: '#8AB8B4',
          activeTintColor: '#2F403E',
          inactiveTintColor: '#5C7D7A',
          keyboardHidesTabBar: true,
          inactiveBackgroundColor: '#9ED2CE'
        }}  
      >
        
        <Tab.Screen name="HOME" component={DrawerHomeNavigator} />
        <Tab.Screen name="STASH" component={DrawerStashNavigator} options={{ tabBarBadge: db.getLijstVervallen().length }} />
        <Tab.Screen name="SCAN" component={DrawerScannerNavigator} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}

export default App;

/*
Before running this, you NEED to edit 2 files
1. /android/app/build.gradle:
 defaultConfig {
        applicationId "com.koelkastapp"
        minSdkVersion rootProject.ext.minSdkVersion
        missingDimensionStrategy 'react-native-camera', 'general' <-- this was added
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    2. add the following to /android/app/src/main/AndroidManifest.xml (permissions)=
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.RECORD_AUDIO"/>
        <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
*/

/* help it didn't run, what now?
    1. did you npm i react-native-camera?
    2. did you link camera? (react-native link react-native-camera)
    3. did you npm i again?
    4. offer a goat
*/
