import * as React from 'react';
import { View, Text, Button, StyleSheet, TextBase } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {removeItem} from './StashScreen'

import Item from "../components/Item"


const Stack = createStackNavigator();
 
function ItemScreen({route, navigation}) {
    var {name, nutriscore, barcode, IMGurl} = route.params;
    return (
      <View style={styles.items}>
        <Text>Information about {name}</Text>

        <Text style={styles.item}>Name: {name}</Text>
        <Text>Nutri Score: {nutriscore}</Text>
        <Text>Barcode: {barcode}</Text>
        <Text>IMG URL: {IMGurl}</Text>
        <Button
        title="Delete product"
        onPress={
          () => { removeItem(barcode); navigation.navigate('STASH');}
        }
        color='#8AB8B4'
      />
      </View>
    );
  }

  export default ItemScreen;

  const styles = StyleSheet.create({
    items: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    item: {
      color: 'black',
      fontSize: 40,
    },
  });