import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from 'react-native-notifications';

function test(){
  Notifications.postLocalNotification({
    title: "Local notification",
    body: "Ik stuur een notification naar Dennis en Jasper en Lowie cuz its cool",
    extra: "data"
});
}

function Home({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Stash"
        onPress={() => navigation.navigate('Stash')}
      />

      <Button
        title="send notification"
        onPress={() => test()}
      />
    </View>
  );
}

export default Home;