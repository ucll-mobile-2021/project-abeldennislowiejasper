import * as React from 'react';
import { useState } from 'react';
import { ScrollView, View, Button, StyleSheet, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scanner from '.././components/CameraScanner';
import Item from '../components/Item'
import { updateItems } from './StashScreen'
import DateTimePicker from '@react-native-community/datetimepicker';
import { State } from 'react-native-gesture-handler';
import { parse } from '@babel/core';
import { getTotalPrice } from './HomeScreen';

//This variables says which date types the scanner can find
const dateRegex = /\d+[\.|\/]\d+[\.|\/]\d+/;
function ScannerScreen({ navigation }: any) {
   const [valueError, setError] = useState("");
   //All values for an item
   const [valueName, setName] = useState("");
   const [valuePrice, setPrice] = useState("");
   const [valueNutri, setNutri] = useState("");
   const [valueIMG, setIMG] = useState("");
   const [valueAllergene, setAllergene] = useState("");
   const [valueDate, setDate] = useState(new Date(Date.now()));
   //statistics variables below
   const [valueEnergy_kcal_value, setEnergy_kcal_value] = useState("0")
   const [valueproteins_100g, setProteins_100g] = useState("0")
   const [valueSugars_100g, setSugars_100g] = useState("0")
   const [valueSodium_100g, setSodium_100g] = useState("0")
   const [valueFat_100g, setFat_100g] = useState("0")
   const [valueProduct_quantity, setProduct_quantity] = useState("0")
   //used to toggle DateTimePicker
   const [showDate, setShowDate] = useState(false);
   const changeBarcodeData = (props: { [x: string ]: any; } | { [x: string]: any; }) => {
      setName(props["name"]);
      setNutri(props["nutriscore"]);
      setIMG(props["imgURL"]);
      setAllergene(props["allergens"].join(', '));

      setEnergy_kcal_value(props["kcal"])
      setSugars_100g(props["sugar"])
      setProteins_100g(props["proteins"])
      setSodium_100g(props["sodium"])
      setFat_100g(props["fat"])
      setProduct_quantity(props["quantity"])
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
      ["A","B","C","D","E",""].includes(nutri.toUpperCase())?setNutri(nutri.toUpperCase()):""
   }

   //Split the Allergenen op , of spatie en zet in lijst
   const splitAllergenen = (allergenen: string) => {
      return allergenen.split(/[\s,]+/)
   }
   const formatNumber = (number: string) => {
      if(number.trim() == ""){return ""}
      else{
         return /^[\d\.,]+$/.test(number)?number:"0"
      }
   }
   const cleanseNumber = (number: string) => { return isNaN(parseFloat(number)) ? 0:parseFloat(number) }
   const clearInputs = () => {
      setName("");
      setPrice("");
      setNutri("");
      setIMG("");
      setAllergene("");
      setDate(new Date(Date.now()));

      setEnergy_kcal_value("0")
      setSugars_100g("0")
      setProteins_100g("0")
      setSodium_100g("0")
      setFat_100g("0")
      setProduct_quantity("0")
   }

   const submit = () => {
      let errors: string = "";
      const numericRegex = /^[0-9]{0,20}(\.[0-9]{1,2})?$/
      if(valueName.trim() == ""){errors+= "Invalid name, please try again\n";}
      if(valuePrice.trim() == ""){errors += "Invalid price, please try again\n"}
      if(!numericRegex.test(valuePrice)){
         errors += "Price must be a number (max. 2 decimals)\n"
      }
      if(errors == ""){
         let realNutri:string = valueNutri==""?"Z":valueNutri;
         updateItems(new Item(Math.floor(Math.random() *1000), valueName, realNutri.toLocaleLowerCase(),
         splitAllergenen(valueAllergene), valueIMG,cleanseNumber(valuePrice), valueDate, cleanseNumber(valueEnergy_kcal_value),
         cleanseNumber(valueproteins_100g), cleanseNumber(valueSugars_100g), cleanseNumber(valueSodium_100g),
         cleanseNumber(valueFat_100g), cleanseNumber(valueProduct_quantity)));
         
         clearInputs()
         navigation.navigate('STASH')
      }
         setError(errors)
   }

   return (
      <View style={{height: "100%"}}>
         <Scanner setFormBarcode={changeBarcodeData} setFormExpirationDate={changeDateData} dateRegex={dateRegex} />
         <ScrollView style={styles.ScannerScreenContainer}>
         <View style={{marginLeft: "10%"}}><Text style={{color: "red"}}>{valueError}</Text></View>
         <View style={styles.form}>
            <View>
               <Text style={styles.label}><Text style={{color: "red"}}>*</Text>Name:</Text>
               <TextInput style={styles.textInput} onChangeText={name => setName(name)} value={valueName}  />
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap', flex: 1}}>
               <View style={{width: "35%"}}>
                  <Text style={styles.label}><Text style={{color: "red"}}>*</Text>Price:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valuePrice.toString()} onChangeText={price => setPrice(price.trim())} />
               </View>
               <View style={{width: "35%", marginLeft: "30%"}}>
                  <Text style={styles.label}>Nutriscore:</Text>
                  <TextInput style={styles.textInput} value={valueNutri} onChangeText={nutri => setNutriVerification(nutri)} />
               </View>
            </View>
            
            <Text style={styles.label}>Allergenes:</Text>
            <TextInput style={styles.textInput} onChangeText={allergene => setAllergene(allergene)} value={valueAllergene} />

            <Text style={styles.label}>Expiration date: {dateToDDMMYYYY()}</Text>
            <View style={{ width: "75%", marginLeft: "12.5%" }}><Button color='#8AB8B4' onPress={toggleShowDate} title="Choose date" /></View>
            {showDate &&
               <DateTimePicker
                  testID="dateTimePicker"
                  value={valueDate}
                  mode={"date"}
                  display="default"
                  onChange={onChangeDate}
                  minimumDate={new Date(Date.now()-( 60* 60 * 1000 * 24 * 365 * 10))} 
                  maximumDate={new Date(Date.now()+( 60* 60 * 1000 * 24 * 365 * 18))} 
                  />}
            <Text style={styles.label}>Image:</Text>
            <TextInput style={styles.textInput} placeholder="http://url.com" value={valueIMG} onChangeText={img => setIMG(img)} />
            
            <View style={{flexDirection:'row', flexWrap:'wrap', flex: 1}}> 
               <View style={{width: "35%"}}>
                  <Text style={styles.label}>Kcal/100g:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valueEnergy_kcal_value.toString()} onChangeText={ecal => setEnergy_kcal_value(formatNumber(ecal))} />
               </View>
               <View style={{width: "35%", marginLeft: "30%"}}>
                  <Text style={styles.label}>Proteins/100g:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valueproteins_100g.toString()} onChangeText={proteins_100g => setProteins_100g(formatNumber(proteins_100g))} />
               </View>
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap', flex: 1}}>
               <View style={{width: "35%"}}>
                  <Text style={styles.label}>Sugar/100g:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valueSugars_100g.toString()} onChangeText={sugar => setSugars_100g(formatNumber(sugar))} />
               </View>
               <View style={{width: "35%", marginLeft: "30%"}}>
                  <Text style={styles.label}>Sodium/100g:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valueSodium_100g.toString()} onChangeText={sod => setSodium_100g(formatNumber(sod))} />
               </View>
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap', flex: 1}}>
               <View style={{width: "35%"}}>
                  <Text style={styles.label}>Fat/100g:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valueFat_100g.toString()} onChangeText={fat => setFat_100g(formatNumber(fat))} />
               </View>
               <View style={{width: "35%", marginLeft: "30%"}}>
                  <Text style={styles.label}>Weight/g:</Text>
                  <TextInput keyboardType={"numeric"} style={styles.textInput} value={valueProduct_quantity.toString()} onChangeText={q => setProduct_quantity(formatNumber(q))} />
               </View>
            </View>
            <Text style={{fontSize: 10}}><Text style={{color: "red"}}>*</Text>required</Text>

            <View style={styles.buttonText}>
               <Button title="Add product" color='#8AB8B4' onPress={() => {submit()}} />
            </View>
         </View>
      </ScrollView>
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
      paddingTop: 20,
      paddingBottom: 20
   }
});

export default ScannerScreen;