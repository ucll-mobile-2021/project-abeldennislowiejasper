import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';

function HelpScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.container}>Need help? Mail to info@koelkastapp.be</Text>
            <Text style={styles.uitleg}>This app can be used to maintain your food supplies.
              Keep track of your products expiration dates so nothing gets wasted.
              You can scan your products barcode when adding your groceries to your stash by using your camera.
              Just scan the barcode and the expiration date and the API will fill in the rest of the info it can find for you!
              Add your items to the stash and you'll get notified when items are going to expire.
              The statistics page can give you a good overview of what kind of products you buy. 

              
            </Text>

           <Text style={styles.uitleg}> If you want to help this app grow visit our KickStarter page www.kickstarter.be/koelkastapp</Text>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 18,
      margin: 5
    },
    uitleg: {
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
      margin: 20
    }
  });

  export default HelpScreen;