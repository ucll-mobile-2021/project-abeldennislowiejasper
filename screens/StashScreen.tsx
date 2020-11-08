import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Item from "../components/Item";
import ItemScreen from "../screens/ItemScreen";
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database'


let db = new Database();

let refresh = false;

let lijst = db.getAllProducts();

class Stash extends Component {

  constructor(props) {
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
    }, 1000)
    return (
      <View style={styles.container}>
        <FlatList style={styles.flatlist} data={lijst} extraData={this.state}
          keyExtractor={item => item.barcode + ""}
          renderItem={
            ({ item }) =>
              <TouchableOpacity style={styles.item}  onPress={() => this.props.navigation.navigate('ItemScreen', item)}>
                <Text style={styles.itemText}>{item.name}</Text>
                
                <Image style={styles.image} source={item.IMGurl ? { uri: item.IMGurl } : { uri:"https://pdsohio.com/wp-content/uploads/2017/04/default-image.jpg"}}  />
              </TouchableOpacity>
          }
        />

      </View>
    );
  }

}

export function updateItems(item: Item) {
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
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "10%",
    width: "80%",
    borderWidth: 2,
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE",
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 15,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems:'center'
  },
  itemText: {
    fontSize: 25
  },
  image: {
    height:50,
    width:50}
});