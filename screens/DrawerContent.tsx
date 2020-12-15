import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import {
    Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import StatsStackScreen from './StatsStackScreen';

export function DrawerContent({props, navigation} : any){
    return (
      
        <View style={styles.drawerTab}>  
            <DrawerContentScrollView {... props}>
            <View style={styles.drawerContent}>
            <View style={{flexDirection:'row',marginTop: 15, marginLeft: 10}}>
            <Avatar.Image
                                source={{
                                    uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png'
                                }}
                                size={50}
                                color='#759E9A'
                            />
                 <View style={{marginLeft: 5, flexDirection:'column'}}>
                                <Title style={styles.title}>Dennis</Title>                                
                            </View></View>
            
            <Drawer.Section style={styles.userInfoSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name ="person-circle-outline"
                        color='#759E9A'
                        size={size}/>                            
                    )}
                    label="My profile"
                    labelStyle={styles.caption}
                    onPress={() => {}}
                />

            </Drawer.Section>
            <Drawer.Section style={styles.userInfoSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name ="document-text-outline"
                        color='#759E9A'
                        size={size}/>                            
                    )}
                    label="Shopping List"
                    labelStyle={styles.caption}
                    onPress={() => {}}
                />

            </Drawer.Section>
            <Drawer.Section style={styles.userInfoSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name ="stats-chart-outline"
                        color='#759E9A'
                        size={size}/>                            
                    )}
                    label="Statistics"
                    labelStyle={styles.caption}
                    onPress={() => {navigation.navigate('StatsStack')}}
                />

            </Drawer.Section>
            
            
            </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="help-circle-outline" 
                        color='#759E9A'
                        size={size}
                        />
                    )}
                    label="Help"
                    labelStyle={styles.caption}
                    onPress={() => {navigation.navigate('HelpStack')}}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerTab: {
      flex: 1,
      backgroundColor: '#9ED2CE',
    },
    drawerContent: {
      flex: 1,
      backgroundColor: '#9ED2CE',
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 20,
      marginTop: 5,
      marginLeft: 10,
      fontWeight: 'bold',
      color: '#3D5250',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color: '#3D5250'
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
