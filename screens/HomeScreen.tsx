import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Item from "../components/Item"
import StashScreen from "../screens/StashScreen"

var soep = new Item(1234, "Soep", "a", "lalala");
var kaka = new Item(4321, "kaka", "d", "ladieda");

var items = [soep, kaka]

const Stack = createStackNavigator();

function Home({navigation}) {
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        { items.map((item, key)=>(
         <Text key={key} style={({fontSize:25})} onPress={()=>navigation.navigate('ItemScreen', item)}> { item.name } </Text>)
         )}
        

        
        <Button
          title="Go to Stash"
          onPress={() => navigation.navigate('Stash')}
        />
      </View>
    );
  }

  export default Home;