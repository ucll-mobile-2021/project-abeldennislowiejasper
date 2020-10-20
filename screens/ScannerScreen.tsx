import * as React from 'react';
import { useState } from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scanner from '.././components/CameraScanner';
import Item from '../components/Item'
import { updateItems } from './StashScreen'
import DateTimePicker from '@react-native-community/datetimepicker';
import { State } from 'react-native-gesture-handler';


const dateRegex = /\d+[\.|\/]\d+[\.|\/]\d+/;
function ScannerScreen({ navigation }: any) {
   //All values for an item
   const [valueName, setName] = useState("");
   const [valueNutri, setNutri] = useState("");
   const [valueIMG, setIMG] = useState("");
   const [valueAllergene, setAllergene] = useState("");
   const [valueDate, setDate] = useState(new Date(Date.now()));
   //used to toggle DateTimePicker
   const [showDate, setShowDate] = useState(false);
   const changeBarcodeData = (props: { [x: string]: any[]; } | { [x: string]: any; }) => {
      setName(props["name"]);
      setNutri(props["nutriscore"]);
      setIMG(props["imgURL"]);
      setAllergene(props["allergens"].join(', '));
   }
   const onChangeDate = (_event: any, selectedDate: any) => {
      const currentDate = selectedDate || valueDate;
      toggleShowDate()
      setDate(currentDate);
   };
   const changeDateData = (data: string) => {
      // data: DD.MM.YYYY -> DD/MM/YYYY
      let replacedString: string = data.replace(/\./gi, "/")
      let formattedDate: string[] = replacedString.split("/")

      var dateObject = new Date(+formattedDate[2], parseInt(formattedDate[1]) - 1, +formattedDate[0]) || valueDate;
      setDate(dateObject);
   }
   const toggleShowDate = () => {
      setShowDate(!showDate);
   }
   const dateToDDMMYYYY = () => {
      let formated: string[] = valueDate.toLocaleDateString().split("/")
      return formated[1] + "/" + formated[0] + "/" + formated[2]
   }
   //Check if nutriscore is A-F
   const setNutriVerification = (nutri: string) => {
      ["A","B","C","D","E","F",""].includes(nutri.toUpperCase())?setNutri(nutri):""
   }

   let newItem = new Item(54671, "test", "f", ["lol"], "1234@hotmail")

   return (
      <View style={styles.ScannerScreenContainer}>
         <Scanner setFormBarcode={changeBarcodeData} setFormExpirationDate={changeDateData} dateRegex={dateRegex} />
         < View style={styles.form}>

            <Text style={styles.label}>Product Name:</Text>
            <TextInput style={styles.textInput} placeholder="M&M Peanuts 1KG/1000g" onChangeText={name => setName(name)} value={valueName} />

            <Text style={styles.label}>Product Nutriscore:</Text>
            <TextInput style={styles.textInput} placeholder="A" value={valueNutri} onChangeText={nutri => setNutriVerification(nutri)} />

            <Text style={styles.label}>Product's Allergene:</Text>
            <TextInput style={styles.textInput} placeholder="Peanuts" onChangeText={allergene => setAllergene(allergene)} value={valueAllergene} />

            <Text style={styles.label}>Expiration date: {dateToDDMMYYYY()}</Text>

            <View style={{ width: "75%", marginLeft: "12.5%" }}><Button color='#8AB8B4' onPress={toggleShowDate} title="Show date picker!" /></View>
            {showDate &&
               <DateTimePicker
                  testID="dateTimePicker"
                  value={valueDate}
                  mode={"date"}
                  display="default"
                  onChange={onChangeDate}
               />}
            <Text style={styles.label}>Product image:</Text>
            <TextInput style={styles.textInput} placeholder="http://idk.com" value={valueIMG} onChangeText={img => setIMG(img)} />

            <View style={styles.buttonText}>
               <Button title="Add product" color='#8AB8B4' onPress={() => { updateItems(newItem) }} />
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