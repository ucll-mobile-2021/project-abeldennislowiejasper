import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import StashScreen from './screens/StashScreen';
import ScannerScreen from './screens/ScannerScreen';
import ItemScreen from './screens/ItemScreen';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stash" component={StashScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="ItemScreen" component={ItemScreen} />
      </Stack.Navigator>
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
