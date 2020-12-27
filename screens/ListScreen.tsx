import React, { Component, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import {
    PieChart, BarChart, ContributionGraph
  } from 'react-native-chart-kit';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database';
import ListItem from '../components/ListItem';

const db = new Database();
let lijstBoodschappen : Array<ListItem>;
let refresh = false;
const [valueName, setName] = useState("");
const [valueAmount, setAmount] = useState("");
const [valueError, setError] = useState("");

const clearInputs = () => {
  setName("");
  setAmount("");
}

function getLijstBoodschappen() {
  lijstBoodschappen = db.getLijstBoodschappen();
  return lijstBoodschappen;
}

function updateItems(item: ListItem) {
  console.log(item);
  db.addListItem(item);
}

const cleanseNumber = (number: string) => {return number.trim()=="" || isNaN(parseFloat(number)) ? 0:parseFloat(number) }

class ListScreen extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      nr: db.length,
      refreshing: refresh
    }
  }

  onRefresh() {
    refresh = true;
    getLijstBoodschappen();
    
    refresh = false;
  }

  render() {
    setTimeout(() => {
      this.setState({ nr: db.length })
      getLijstBoodschappen();
      this.onRefresh();
      console.log('refreshed')
    }, 1000)

    const submit = () => {
      let id = Math.random()
      let errors: string = "";
      if(valueAmount == ""){errors += "Invalid amount, please try again\n"}
      if(valueName.trim() == ""){errors+= "Invalid name, please try again\n";}
      if(errors == ""){
         updateItems(new ListItem(id, valueName, cleanseNumber(valueAmount),));
         
         clearInputs()
      }
         setError(errors)
   }


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.form}>
            <View>
               <Text style={styles.label}><Text style={{color: "red"}}>*</Text>Name:</Text>
               <TextInput style={styles.textInput} onChangeText={name => setName(name)} value={valueName}  />
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap', flex: 1}}>
               <View style={{width: "35%"}}>
                  <Text style={styles.label}>Amount<Text style={{color: "red"}}>*</Text>:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valueAmount.toString()} onChangeText={amount => setAmount(amount)} />
               </View>
               </View>
               <Text style={{fontSize: 10}}><Text style={{color: "red"}}>*</Text>required</Text>

            <View style={styles.buttonText}>
              <Button title="Add item" color='#8AB8B4' onPress={() => {submit()}} />
            </View>
      </View>
        <FlatList  data={getLijstBoodschappen()} extraData={this.state}
          keyExtractor={item => item.id + ""}
          renderItem={
            ({ item }) =>
            <TouchableOpacity style={styles.item}>
                
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.amount}</Text>
                <Text style={styles.arrow}>{'X'}</Text>

              </TouchableOpacity>             
          }
        />
      </View>
      
    );
  }
}

  
const styles = StyleSheet.create({
  stattext: {
    padding: 12,
    marginTop: 2,
    marginBottom: 2,
    width: "45%",
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE",
    borderWidth: 2,
    borderRadius: 6,
    alignItems: 'center'

  },
  headerBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20
  },
  item: {
    marginTop: 15,
    //paddingTop: 25,
    backgroundColor: "#80ABA7", //#9ED2CE
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "99%",
    borderRadius: 12,
    marginLeft: "0%",
  },
  itemText: {
    fontSize: 25,
    width: "60%",
    alignSelf: "center",
    paddingLeft: 15,
  },
  imageView: {
    width: "25%",
    height: "100%",
    //backgroundColor: "red"
  },
  image: {
    width: 45,
    height: 45,
    alignSelf: "center"
  },
  arrow: {
    width: "15%",
    fontSize: 20,
  },
  bla: {
    flexDirection: 'row'
  },
  bli: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  blu: { fontSize: 10, color: 'black' },
  box: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE", //#779E9B
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
    flexDirection: 'row',
    alignItems: 'center'

  },
  ScannerScreenContainer: {
    flex: 1,
 },
 FormContainer: {
    width: '75%',
    marginLeft: '12.5%',
    paddingTop: 50
 },
 title: {
    width: '80%',
    marginLeft: '10%',
    textAlign: "center",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
 },
 form: {
    width: '75%',
    marginLeft: '12.5%'
 },
 cameraButtonContainer: {
    width: "50%",
    marginLeft: '25%',
    paddingTop: 10
 },
 label: {
    paddingTop: 25
 },
 textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 0
 },
 buttonText: {
    paddingTop: 20
 }
});

  export default ListScreen;