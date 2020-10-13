import * as React from 'react';
import { View, Button, StyleSheet, Keyboard } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scanner from '.././components/CameraScanner';
import Form from '.././components/Form';

function ScannerScreen({ navigation }) {
   return (
      <View style={styles.ScannerScreenContainer}>
         <Text h1 style={styles.title}>Add product</Text>
         <Scanner />
         <View style={styles.form}>
            <View style={styles.FormContainer}>
               <Form
                  buttonText="Submit"
                  fields={{
                     ProductName: {
                        label: 'Product Name:',
                        placeholder: 'M&M Peanuts 1KG/1000g'
                     },
                     Nutriscore: {
                        label: 'Nutriscore:',
                        placeholder: 'A'
                     },
                     ExpirationDate: {
                        label: 'Expiration date:',
                        placeholder: 'DD-MM-YYYY',
                        inputProps: { //TODO; Add '-' automatically
                           //keyboardType: 'numeric',
                        }
                     },
                     IMGurl: {
                        label: 'Image URL:',
                        placeholder: 'https://media.s-bol.com/qQKD7o5z5qXD/550x464.jpg'
                     },
                  }}
               />
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
   },
   cameraButtonContainer: {
      width: "50%",
      marginLeft: '25%',
      paddingTop: 10
   }
});

export default ScannerScreen;