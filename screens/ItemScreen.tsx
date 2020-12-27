import * as React from 'react';
import { View, Text, Button, StyleSheet, TextBase, Image, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {removeItem} from './StashScreen'

import Item from "../components/Item"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
 
function ItemScreen({route, navigation }: any) {

    var {name, nutriscore, barcode, IMGurl, 
      allergene, price, expiration_date, energy_kcal_value, proteins_100g, sugars_100g,sodium_100g,fat_100g,product_quantity} = route.params;
    var date = new Date(expiration_date * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var datestring = day + "/" + month + "/" + year;
    var currentDate = new Date()
    return (
      <ScrollView style={styles.items}>
        <Image   resizeMode="cover" style={styles.image} source={{ uri: IMGurl }}  />

        <View style={styles.view}>
          <Text style={styles.informatie}>Information about {name}</Text>

          <Text style={styles.item}>Name: {name}</Text>
          {expiration_date < currentDate && <Ionicons name={'md-warning'} style={{alignSelf: "center"}} size={40} color={'red'} /> }
          {expiration_date < currentDate && <Text style={{alignSelf: "center"}}>This product is expired!</Text> }
          <Text><Text style={styles.textbold}>Nutri-Score:</Text> {nutriscore}</Text>
          <Text><Text style={styles.textbold}>Barcode:</Text> {barcode}</Text>
          <Text><Text style={styles.textbold}>Allergene:</Text> {allergene}</Text>
          <Text><Text style={styles.textbold}>Price:</Text> €{price}</Text>
          <Text><Text style={styles.textbold}>Expiration Date:</Text> {datestring}</Text>
          <Text><Text style={styles.textbold}>Energy:</Text> {energy_kcal_value} kcal</Text>
          <Text><Text style={styles.textbold}>Protein (100g):</Text> {proteins_100g} g</Text>
          <Text><Text style={styles.textbold}>Sugar (100g):</Text> {sugars_100g} g</Text>
          <Text><Text style={styles.textbold}>Sodium (100g):</Text> {sodium_100g} mg</Text>
          <Text><Text style={styles.textbold}>Fat (100g):</Text> {fat_100g} g</Text>
          <Text><Text style={styles.textbold}>Quantity:</Text> {product_quantity}</Text>
        
        <TouchableOpacity
        
        onPress={
          () => { removeItem(barcode); 
            navigation.navigate('Stash');
          }
        }
        style={styles.button}
      > 
      <Text style={styles.buttontext}>Delete product</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }

  export default ItemScreen;

  const styles = StyleSheet.create({
    items: {
      
    },
    view: {
      marginLeft: 10
    },
    item: {
      color: 'black',
      fontSize: 35,
      marginBottom: 20,
      fontWeight: 'bold'
    },
    image: {
      width: 400,
      height: 200,
      alignSelf: "center",
      marginBottom: 20
    },
    button: {
      elevation: 8,
      color: '#ffffff',
      backgroundColor:'#f0655b',
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 10,

      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      width: Dimensions.get('window').width - 20
    },
    buttontext: {
      color: '#ffffff',
      fontWeight: 'bold'
    },
    textbold: {
      fontWeight: 'bold'
    },
    informatie: {
      color: '#888888',
      marginBottom: 10
    }
  });