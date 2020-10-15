import * as React from 'react';
import { useState } from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scanner from '.././components/CameraScanner';
import Item from '../components/Item'
import {updateItems} from './StashScreen'

function ScannerScreen({ navigation }: any) {
   let [valueName, setName] = useState("");
   let [valueNutri, setNutri] = useState("");
   let [valueIMG, setIMG] = useState("");
   let [valueAllergene, setAllergene] = useState("");
   let [valueDate, setDate] = useState("");
   const changeBarcodeData = (props: { [x: string]: any[]; } | { [x: string]: any; } ) => {
      setName(props["name"]);
      setNutri(props["nutriscore"]);
      setIMG(props["imgURL"]);
      setAllergene(props["allergens"].join(', '));
   }
   const changeDateData = (date: string) => {
      setDate(date);
   }

   let newItem = new Item(54671, "test", "f", ["lol"], "1234@hotmail")

   return (
      <View style={styles.ScannerScreenContainer}>
         <Text h1 style={styles.title}>Add product</Text>
         <Scanner setFormBarcode={changeBarcodeData} setFormExpirationDate={changeDateData}/>
            < View style={styles.form}>

            <Text style={styles.label}>Product Name</Text>
            <TextInput style={styles.textInput} placeholder="M&M Peanuts 1KG/1000g" onChangeText={name => setName(name)} value={valueName} />

            <Text style={styles.label}>Product Nutriscore</Text>
            <TextInput style={styles.textInput} placeholder="A" value={valueNutri} onChangeText={nutri => setNutri(nutri)} />

            <Text style={styles.label}>Product's Allergene</Text>
            <TextInput style={styles.textInput} placeholder="Peanuts" onChangeText={allergene => setAllergene(allergene)} value={valueAllergene} />

            <Text style={styles.label}>Expiration date</Text>
            <TextInput style={styles.textInput} placeholder="05.05.2020" onChangeText={date => setDate(date)} value={valueDate} />

            <Text style={styles.label}>Image url</Text>
            <TextInput style={styles.textInput} placeholder="htpp://dummy.com" onChangeText={img => setIMG(img)} value={valueIMG} />

            <View style={styles.buttonText}>
               <Button title="Add product" onPress={() => {updateItems(newItem)}} />
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
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

export default ScannerScreen;