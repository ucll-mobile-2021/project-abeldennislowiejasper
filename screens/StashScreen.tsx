import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Item from "../components/Item";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemScreen from "../screens/ItemScreen";
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database'


let db = new Database();

let refresh = false;

let lijst = db.getAllProducts();



export function getAll(){
  return lijst;
}

export function getDB(){
  return db;
}

class Stash extends Component {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      nr: db.length,
      refreshing: refresh
    }
  }

  onRefresh() {
    refresh = true;
    lijst = db.getAllProducts()
    refresh = false;
  }

  render() {
    setTimeout(() => {
      this.setState({ nr: db.length })
      lijst = db.getAllProducts();
    }, 300)
    let currentdate = new Date();
    currentdate.setDate(currentdate.getDate() - 1);
    return (
      <View style={styles.container}>
        <FlatList style={styles.flatlist} data={lijst} extraData={this.state}
          keyExtractor={item => item.barcode + ""}
          renderItem={
            ({ item }) =>
              <TouchableOpacity style={styles.item}  onPress={() => this.props.navigation.navigate('ItemScreen', {
                name: item.name, 
                barcode: item.barcode,
                nutriscore: item.nutriscore,
                allergene: item.allergene,
                IMGurl: item.IMGurl,
                price: item.price,
                expiration_date: (item.expiration_date).getTime()/ 1000,
                energy_kcal_value: item.energy_kcal_value,
                proteins_100g: item.proteins_100g,
                sugars_100g: item.sugars_100g,
                sodium_100g: item.sodium_100g,
                fat_100g: item.fat_100g,
                product_quantity: item.product_quantity})}>
                <View style={styles.imageView}>
                <Image   resizeMode="cover" style={styles.image} source={item.IMGurl ? { uri: item.IMGurl } : { uri:"https://pdsohio.com/wp-content/uploads/2017/04/default-image.jpg"}}  />
                </View>
                {/* dees toevoegen als een item vervallen is */}
                <View style={styles.icon}>
                  {item.expiration_date < currentdate && <Ionicons name={'md-warning'} style={{alignSelf: "center"}} size={35} color={'red'} /> }
                </View>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.arrow}>{'→'}</Text>

              </TouchableOpacity>
          }
        />

      </View>
    );
  }

}

export function updateItems(item: Item) {
  console.log(item);
  db.addProduct(item);
}

export function removeItem(barcode: string){
  db.removeProduct(barcode);
}

export default Stash;

const styles = StyleSheet.create({
  container: {
    
  },
  flatlist: {
    
    },
  item: {
    marginTop: 15,
    //paddingTop: 25,
    backgroundColor: "white", //#9ED2CE
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "95%",
    marginLeft: "2.5%"
  },
  itemText: {
    fontSize: 25,
    width: "40%",
    alignSelf: "center",
    paddingLeft: 15,
  },
  icon:{
    width: "20%"
  },
  imageView: {
    width: "25%",
    height: "100%",
    //backgroundColor: "red"
  },
  image: {
    width: 90,
    height: 90,
    alignSelf: "center"
  },
  arrow: {
    width: "15%",
    fontSize: 40,
  }
});