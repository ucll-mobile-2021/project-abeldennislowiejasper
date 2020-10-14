import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from 'react-native-notifications';

function test() {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
    // TODO: Send the token to my server so it could send back push notifications...
    console.log("Device Token Received", event.deviceToken);
  });
  Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
    console.error(event);
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