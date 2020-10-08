import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import Scanner from '.././components/barcodeScanner';
import Header from '.././components/Header'; */

function BarcodeScanner({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        {/* <Scanner //This line calls the Render function inside Scanner
        /> */}
      </View>
   );
}

export default BarcodeScanner;